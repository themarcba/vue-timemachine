import { reactive, computed, toRaw } from "vue";
import { tileTypes } from "../utils/game";
export default function useGame(initialState) {
  const state = reactive(structuredClone(toRaw(initialState)));

  const reduceHealth = (amount) => {
    state.health = state.health <= amount ? 0 : state.health - amount;
  };
  const move = (x, y) => {
    if (state.health <= 0 || state.hasFoundTreasure) return;

    // calculate new position
    const newPositionX = state.positionX + x;
    const newPositionY = state.positionY + y;
    const tile = tileTypes[state.matrix[newPositionY]?.[newPositionX]];

    // avoid running out of bounds
    if (!tile) return;

    // react to different spaces
    if (tile.type === "OBSTACLE") {
      console.log(tile.emoji, "You hit an obstacle!");
      return;
    } else if (tile.type === "HAZARD") {
      reduceHealth(30);
      console.log("🐍", "You've been bitten by a snake! Health decreased by 30%!", state.health);
    } else if (tile.type === "INVISIBLE_HAZARD" || tile.type === "INVISIBLE_HAZARD_UNCOVERED") {
      reduceHealth(50);
      state.matrix[newPositionY][newPositionX] = "U";
      console.log("🔥", "You've stepped into a hidden hazard! Health decreased by 50%!");
    } else if (tile.type === "POTION") {
      state.health = 100;
      state.matrix[newPositionY][newPositionX] = " ";
      console.log("🧪", "You've found a health potion! Health restored!");
    } else if (tile.type === "TREASURE") {
      state.hasFoundTreasure = true;
      console.log("🏆", "You've found the treasure!");
    }

    // make the actual move
    state.positionX = newPositionX;
    state.positionY = newPositionY;
  };
  return { state, move };
}
