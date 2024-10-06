export const mapToMatrix = (map) => {
  const lines = map.split("\n");
  const matrix = lines.filter((line) => line.length > 0).map((line) => line.split(""));
  return matrix;
};

export const tileTypes = {
  P: { type: "POTION", emoji: "🧪" },
  T: { type: "TREASURE", emoji: "🏆" },
  O: { type: "OBSTACLE", emoji: "🌲" },
  I: { type: "INVISIBLE_HAZARD", emoji: " " },
  U: { type: "INVISIBLE_HAZARD_UNCOVERED", emoji: "🔥" },
  H: { type: "HAZARD", emoji: "🐍" },
  G: { type: "GRASS", emoji: "🌱" },
  R: { type: "ROAD", emoji: " " },
  " ": { type: "EMPTY", emoji: " " },
};
