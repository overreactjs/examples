import { BitmapAsset } from "@engine";

export { default as TEST_VECTOR } from "../assets/test.svg?react";

import gem from "./gem.png"
import playerIdle from "./player-idle.png";
import playerRun from "./player-run.png";
import playerJump from "./player-jump.png";
import playerFall from "./player-fall.png";

export const GEM: BitmapAsset = { url: gem, size: [128, 16], scale: 3 };
export const PLAYER_IDLE: BitmapAsset = { url: playerIdle, size: [228, 34], scale: 3 };
export const PLAYER_RUN: BitmapAsset = { url: playerRun, size: [168, 33], scale: 3 };
export const PLAYER_JUMP: BitmapAsset = { url: playerJump, size: [40, 36], scale: 3 };
export const PLAYER_FALL: BitmapAsset = { url: playerFall, size: [40, 36], scale: 3 };
