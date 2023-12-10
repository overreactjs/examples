import { cards } from './assets';
import { CardType } from './state';

export const P1_KEYBINDINGS = {
  jumpKey: 'KeyW',
  leftKey: 'KeyA',
  rightKey: 'KeyD',
};

export const P2_KEYBINDINGS = {
  jumpKey: 'KeyI',
  leftKey: 'KeyJ',
  rightKey: 'KeyL',
};

// https://lospec.com/palette-list/vinik24
export const PALETTE_VINEK24 = ['#6f6776', '#9a9a97', '#c5ccb8', '#8b5580', '#c38890', '#a593a5', '#666092', '#9a4f50', '#c28d75', '#7ca1c0', '#416aa3', '#8d6268', '#be955c', '#68aca9', '#387080', '#6e6962', '#93a167', '#6eaa78', '#557064', '#9d9f7f', '#7e9e99', '#5d6872'];

// https://lospec.com/palette-list/curiosities
export const PALETTE_CURIOSITIES = ['#46425e', '#15788c', '#00b9be', '#ffeecc', '#ffb0a3', '#ff6973'];

// https://lospec.com/palette-list/island-joy-16
export const PALETTE_ISLAND_JOY_16 = ['#6df7c1', '#11adc1', '#606c81', '#1e8875', '#5bb361', '#a1e55a', '#f7e476', '#f99252', '#cb4d68', '#6a3771', '#c92464', '#f48cb6', '#f7b69e', '#9b9c82'];

type CardConfig = {
  color: string;
  image: string;
}

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
