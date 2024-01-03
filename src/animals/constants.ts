import * as images from "./assets";

export type AnimalConfig = {
  name: string;
  color: string;
  url: string;
}

export const ANIMALS: AnimalConfig[] = [
  {
    name: 'Deer',
    color: '#EADCC7',
    url: images.deer,
  }, {
    name: 'Owl',
    color: '#BCE0E1',
    url: images.owl,
  }, {
    name: 'Wild Boar',
    color: '#F4E7A6',
    url: images.wildBoar,
  }, {
    name: 'Turkey',
    color: '#BBE4F5',
    url: images.turkey,
  }, {
    name: 'Fox',
    color: '#F0AF7B',
    url: images.fox,
  }, {
    name: 'Snake',
    color: '#CBD9A6',
    url: images.snake,
  }, {
    name: 'Wolf',
    color: '#D5C5C8',
    url: images.wolf,
  }, {
    name: 'Mole',
    color: '#BCDCCD',
    url: images.mole,
  }, {
    name: 'Grizzly Bear',
    color: '#ECB0AE',
    url: images.grizzlyBear,
  }, {
    name: 'Squirrel',
    color: '#CED2C7',
    url: images.squirrel,
  }, {
    name: 'Hedgehog',
    color: '#E6E2A6',
    url: images.hedgehog,
  }, {
    name: 'Eagle',
    color: '#C8D4DE',
    url: images.eagle,
  }, {
    name: 'Vulture',
    color: '#E3B19D',
    url: images.vulture,
  }, {
    name: 'Brown Bear',
    color: '#D6BDA0',
    url: images.brownBear,
  }, {
    name: 'Badger',
    color: '#E8BBC1',
    url: images.badger,
  },
];
