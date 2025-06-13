// Demos
import { ButtonsDemo } from "./buttons";
import { HapticsDemo } from "./haptics";
import { MarbleJarDemo } from "./marble-jar";
import { MotionDemo } from "./motion";
import { OrientationDemo } from "./orientation";
import { PairsDemo } from "./pairs";
import { ParticlesDemo } from "./particles";
import { RotatingBoxDemo } from "./rotating-box";
import { SpritesDemo } from "./sprites";
import { LightingDemo, MultiplayerDemo, PlatformerDemo } from "./platformer";
import { ResponsiveDemo } from "./responsive";

// Experiments
import { Day1Demo } from "./day-1-blobs";
import { Day2Demo } from "./day-2-flickers";
import { Day3Demo } from "./day-3-more-blobs";
import { Day4Demo } from "./day-4-zx-spectrum";
import { Day5Demo } from "./day-5-proximity";
import { Day6Demo } from "./day-6-maze-builder";
import { Day7Demo } from "./day-7-dice";
import { Day8Demo } from "./day-8-transitions";

export const demos = [
  { name: 'Rotating Box', path: '/rotating-box', component: RotatingBoxDemo },
  { name: 'Animations (Sprites)', path: '/sprites', component: SpritesDemo },
  { name: 'Marble Jar (Physics)', path: '/physics', component: MarbleJarDemo },
  { name: 'Pairs (Events)', path: '/pairs', component: PairsDemo },
  { name: 'Buttons (CSS Styles)', path: '/buttons', component: ButtonsDemo },
  { name: 'Particles', path: '/particles', component: ParticlesDemo },
  { name: 'Device Motion', path: '/motion', component: MotionDemo },
  { name: 'Device Orientation', path: '/orientation', component: OrientationDemo },
  { name: 'Haptics', path: '/haptics', component: HapticsDemo },
  { name: 'Platform Game (Collisions)', path: '/platformer', component: PlatformerDemo },
  { name: 'Multiplayer (Split-screen) ', path: '/multiplayer', component: MultiplayerDemo },
  { name: 'Lighting Effects', path: '/lighting', component: LightingDemo },
  { name: 'Responsive Screen', path: '/responsive', component: ResponsiveDemo },
];

export const experiments = [
  { name: 'Day 8: Transitions', path: '/day-8', component: Day8Demo },
  { name: 'Day 7: Dice', path: '/day-7', component: Day7Demo },
  { name: 'Day 6: Maze Builder', path: '/day-6', component: Day6Demo },
  { name: 'Day 5: Pointer Proximity', path: '/day-5', component: Day5Demo },
  { name: 'Day 4: ZX Spectrum Emulation', path: '/day-4', component: Day4Demo },
  { name: 'Day 3: Ink Blob', path: '/day-3', component: Day3Demo },
  { name: 'Day 2: Flickers', path: '/day-2', component: Day2Demo },
  { name: 'Day 1: Blobs', path: '/day-1', component: Day1Demo },
];
