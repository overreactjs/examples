import { Day1Demo } from "./day-1-blobs";
import { Day2Demo } from "./day-2-flickers";
import { Day3Demo } from "./day-3-more-blobs";
import { Day4Demo } from "./day-4-zx-spectrum";
import { Day5Demo } from "./day-5-proximity";
import { Day6Demo } from "./day-6-maze-builder";
import { Day7Demo } from "./day-7-dice";
import { Day8Demo } from "./day-8-transitions";
import { Day9Demo } from "./day-9-pixelate-filter";

export const experiments = [
  { name: 'Day 9: Pixelate Filter', path: '/day-9', component: Day9Demo },
  { name: 'Day 8: Transitions', path: '/day-8', component: Day8Demo },
  { name: 'Day 7: Dice', path: '/day-7', component: Day7Demo },
  { name: 'Day 6: Maze Builder', path: '/day-6', component: Day6Demo },
  { name: 'Day 5: Pointer Proximity', path: '/day-5', component: Day5Demo },
  { name: 'Day 4: ZX Spectrum Emulation', path: '/day-4', component: Day4Demo },
  { name: 'Day 3: Ink Blob', path: '/day-3', component: Day3Demo },
  { name: 'Day 2: Flickers', path: '/day-2', component: Day2Demo },
  { name: 'Day 1: Blobs', path: '/day-1', component: Day1Demo },
];