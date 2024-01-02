import { CardConfig, CardType } from "./types";
import * as cards from "./assets";

export const CONFIG: Record<CardType, CardConfig> = {
  bee: {
    color: "#52C8FF",
    image: cards.bee,
  },
  campfire: {
    color: "#A96A45",
    image: cards.campfire,
  },
  carrot: {
    color: "#DF9C45",
    image: cards.carrot,
  },
  cheese: {
    color: "#FBD050",
    image: cards.cheese,
  },
  diamond: {
    color: "#A1E9DE",
    image: cards.diamond,
  },
  leaf: {
    color: "#B7D950",
    image: cards.leaf,
  },
  heart: {
    color: "#EC6157",
    image: cards.heart,
  },
  map: {
    color: "#E37BBD",
    image: cards.map,
  },
  mushroom: {
    color: "#EF9E78",
    image: cards.mushroom,
  },
  treasure: {
    color: "#9E6DFF",
    image: cards.treasure,
  },
};
  