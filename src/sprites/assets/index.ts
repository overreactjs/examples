import { BitmapSpriteAsset } from "@overreact/engine";

import idle from "./idle.png";
import run from "./run.png";
import walk from "./walk.png";

export const IDLE: BitmapSpriteAsset = {
  url: idle,
  size: [256, 48],
  count: 8,
  rate: 10,
};
export const RUN: BitmapSpriteAsset = {
  url: run,
  size: [256, 48],
  count: 8,
  rate: 10,
};
export const WALK: BitmapSpriteAsset = {
  url: walk,
  size: [256, 48],
  count: 8,
  rate: 10,
};
