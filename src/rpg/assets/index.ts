import { Tileset } from "@overreact/engine";
import tileset from "./tileset.png";

export const TILESET: Tileset = {
  image: {
    url: tileset,
    size: [128, 256],
  },
  gridSize: [16, 16],
  cellSize: [64, 64],
};
