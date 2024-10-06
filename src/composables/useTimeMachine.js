import { reactive, watch, ref, toRaw } from "vue";

export default function useTimeMachine(initialState) {
  const state = reactive(initialState);
  const ignoreWatch = ref(false);

  // initialize history
  const history = ref([]);
  history.value.push(structuredClone(toRaw(initialState)));
  const historyIndex = ref(0);

  watch(
    state,
    (newState) => {
      if (ignoreWatch.value) return;
      // push new state when the state has changed
      history.value.push(structuredClone(toRaw(newState)));
      historyIndex.value++;
    },
    {
      flush: "sync",
    }
  );

  const moveToIndex = (index, deleteHistory) => {
    if (index < 0 && historyIndex.value === 0) {
      throw new Error("BEFORE_RECORDED_HISTORY");
    }
    if (index >= history.value.length) {
      throw new Error("AFTER_RECORDED_HISTORY");
    }
    historyIndex.value = index;
    const currentState = { ...history.value[historyIndex.value] };
    ignoreWatch.value = true;
    for (const key in currentState) {
      state[key] = currentState[key];
    }
    ignoreWatch.value = false;

    // erase the history after the current index
    if (deleteHistory) {
      history.value = history.value.slice(0, historyIndex.value + 1);
    }
  };

  const backwards = () => moveToIndex(historyIndex.value - 1);
  const forwards = () => moveToIndex(historyIndex.value + 1);

  return {
    state,
    history,
    historyIndex,
    backwards,
    forwards,
  };
}
