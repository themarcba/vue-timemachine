import { reactive, watch, ref, toRaw } from "vue";

export default function useTimeMachine(initialState) {
  const state = reactive(initialState);
  const ignoreWatch = ref(false);

  // initialize history
  const history = ref([]);
  history.value.push({ ...structuredClone(toRaw(initialState)), timestamp: new Date() });
  const historyIndex = ref(0);

  watch(
    state,
    (newState) => {
      if (ignoreWatch.value) return;
      // push new state when the state has changed
      history.value.push({ ...structuredClone(toRaw(newState)), timestamp: new Date() });
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

  const backInTime = (seconds) => {
    // calculate time for maximal history
    const targetTime = new Date(new Date() - seconds * 1000);
    // find the index of the state that is closest to the target time
    const index = history.value.findIndex((state) => state.timestamp > targetTime);
    // move to the state with the index, and delete the history after
    if (index !== -1) moveToIndex(index, true);
  };

  return {
    state,
    history,
    historyIndex,
    backwards,
    forwards,
    backInTime,
  };
}
