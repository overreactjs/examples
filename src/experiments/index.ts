import { Day1Demo } from "./day-1-blobs";
import { Day2Demo } from "./day-2-flickers";
import { Day3Demo } from "./day-3-more-blobs";
import { Day4Demo } from "./day-4-zx-spectrum";
import { Day5Demo } from "./day-5-proximity";
import { Day6Demo } from "./day-6-maze-builder";
import { Day7Demo } from "./day-7-dice";
import { Day8Demo } from "./day-8-transitions";
import { Day9Demo } from "./day-9-pixelate-filter";
import { Day10Demo } from "./day-10-marble-maze";
import { Day11Demo } from "./day-11-destructible-terrain";
import { Day12Demo } from "./day-12-pointer-trail";
import { Day13Demo } from "./day-13-confetti";

export const experiments = [
  { name: '#13 – Confetti', path: '/day-13', component: Day13Demo },
  { name: '#12 – Pointer Trail', path: '/day-12', component: Day12Demo },
  { name: '#11 – Destructible Terrain', path: '/day-11', component: Day11Demo },
  { name: '#10 – Marble Maze', path: '/day-10', component: Day10Demo },
  { name: '#9 – Pixelate Filter', path: '/day-9', component: Day9Demo },
  { name: '#8 – Transitions', path: '/day-8', component: Day8Demo },
  { name: '#7 – Dice', path: '/day-7', component: Day7Demo },
  { name: '#6 – Maze Builder', path: '/day-6', component: Day6Demo },
  { name: '#5 – Pointer Proximity', path: '/day-5', component: Day5Demo },
  { name: '#4 – ZX Spectrum Emulation', path: '/day-4', component: Day4Demo },
  { name: '#3 – Ink Blob', path: '/day-3', component: Day3Demo },
  { name: '#2 – Flickers', path: '/day-2', component: Day2Demo },
  { name: '#1 – Blobs', path: '/day-1', component: Day1Demo },
];