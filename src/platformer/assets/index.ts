import { BitmapAsset, BitmapSpriteAsset } from "@overreact/engine";

import gem from "./gem.png"
import playerIdle from "./player-idle.png";
import playerRun from "./player-run.png";
import playerJump from "./player-jump.png";
import playerFall from "./player-fall.png";
import jungleTileset from "./jungle.png";

export const GEM: BitmapSpriteAsset = {
  url: gem,
  size: [128, 16],
  count: 8,
  rate: 10,
};
export const PLAYER_IDLE: BitmapSpriteAsset = {
  url: playerIdle,
  size: [228, 34],
  count: 12,
  rate: 10,
};
export const PLAYER_RUN: BitmapSpriteAsset = {
  url: playerRun,
  size: [168, 33],
  count: 8,
  rate: 10,
};
export const PLAYER_JUMP: BitmapSpriteAsset = {
  url: playerJump,
  size: [40, 36],
  count: 1,
  rate: 10,
};
export const PLAYER_FALL: BitmapSpriteAsset = {
  url: playerFall,
  size: [40, 36],
  count: 2,
  rate: 10,
};
export const JUNGLE_TILESET: BitmapAsset = {
  url: jungleTileset,
  size: [128, 128],
};
