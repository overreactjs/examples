import { BitmapAsset, Tileset } from "@overreact/engine";

import imageUrl from "./image.png";
import playerUrl from "./player.png";
import attributesUrl from "./attributes.png";

export const IMAGE: BitmapAsset = {
  url: imageUrl,
  size: [32, 32],
};

export const PLAYER: BitmapAsset = {
  url: playerUrl,
  size: [32, 32],
};

export const ATTRIBUTES_TILESET: Tileset = {
  image: {
    url: attributesUrl,
    size: [64, 16],
  },
  cellSize: [8, 8],
  tileSize: [8, 8],
  gridSize: [32, 24],
};
