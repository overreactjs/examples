import { Tileset } from "@overreact/engine";
import tileset from "./tileset.png";

export const NORTH = 0b0001;
export const EAST = 0b0010;
export const SOUTH = 0b0100;
export const WEST = 0b1000;

export const TILESET: Tileset = {
  image: {
    url: tileset,
    size: [640, 640],
  },
  tileSize: [160, 160],
  cellSize: [64, 64],
  gridSize: [12, 12],
};
