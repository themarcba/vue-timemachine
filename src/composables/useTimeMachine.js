import { reactive, watch, ref, computed, toRaw } from "vue";

export default function useTimeMachine(initialState) {
  const state = reactive(initialState);
  const ignoreWatch = ref(false);

  const timelines = ref([{ history: [], historyIndex: 0 }]);
  const timelineIndex = ref(0);
  timelines.value[timelineIndex.value].history.push({
    ...structuredClone(toRaw(initialState)),
    timestamp: new Date(),
  });

  const history = computed(() => timelines.value[timelineIndex.value].history);

  watch(
    state,
    (newState) => {
      if (ignoreWatch.value) return;
      timelines.value[timelineIndex.value].history.push({
        ...structuredClone(toRaw(newState)),
        timestamp: new Date(),
      });
      timelines.value[timelineIndex.value].historyIndex++;
    },
    {
      flush: "sync",
    }
  );

  const moveToIndex = (index, deleteHistory) => {
    if (index < 0 && timelines.value[timelineIndex.value].historyIndex === 0) {
      throw new Error("BEFORE_RECORDED_HISTORY");
    }
    timelines.value[timelineIndex.value].historyIndex = index;
    const currentState = {
      ...structuredClone(toRaw(timelines.value[timelineIndex.value].history[index])),
    };
    ignoreWatch.value = true;
    for (const key in currentState) {
      state[key] = currentState[key];
    }
    ignoreWatch.value = false;
    if (deleteHistory) {
      timelines.value[timelineIndex.value].history = timelines.value[
        timelineIndex.value
      ].history.slice(0, timelines.value[timelineIndex.value].historyIndex + 1);
    }
  };
  const backwards = () => {
    moveToIndex(timelines.value[timelineIndex.value].historyIndex - 1);
  };

  const forwards = () => {
    moveToIndex(timelines.value[timelineIndex.value].historyIndex + 1);
  };

  const backInTime = (seconds) => {
    const newTimeline = { ...timelines.value[timelineIndex.value] };
    timelines.value.push(newTimeline);
    timelineIndex.value = timelines.value.length - 1;
    const targetTime = new Date(new Date() - seconds * 1000);
    const index = timelines.value[timelineIndex.value].history.findIndex((history) => {
      return history.timestamp > targetTime;
    });
    if (index !== -1) moveToIndex(index, true);
  };

  const changeTimeline = (difference) => {
    const newTimelineIndex = timelineIndex.value + difference;
    if (newTimelineIndex < 0 || newTimelineIndex >= timelines.value.length) {
      throw new Error("TIMELINE_DOESNT_EXIST");
    }
    timelineIndex.value = newTimelineIndex;
    moveToIndex(timelines.value[timelineIndex.value].historyIndex);
  };

  return {
    state,
    history,
    timelineIndex,
    backwards,
    forwards,
    backInTime,
    changeTimeline,
    timelines,
  };
}
