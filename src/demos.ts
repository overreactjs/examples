import { AnimalsDemo } from "./animals";
import { ButtonsDemo } from "./buttons";
import { HapticsDemo } from "./haptics";
import { MarbleJarDemo } from "./marble-jar";
import { MotionDemo } from "./motion";
import { OrientationDemo } from "./orientation";
import { PairsDemo } from "./pairs";
import { ParticlesDemo } from "./particles";
import { LightingDemo, MultiplayerDemo, PlatformerDemo, ViewportScaleDemo } from "./platformer";
import { RotatingBoxDemo } from "./rotating-box";
import { SpritesDemo } from "./sprites";

export const mobile = [
  { name: 'Rotating Box', path: '/rotating-box', component: RotatingBoxDemo },
  { name: 'Animations (Sprites)', path: '/sprites', component: SpritesDemo },
  { name: 'Marble Jar (Physics)', path: '/physics', component: MarbleJarDemo },
  { name: 'Pairs (Events)', path: '/pairs', component: PairsDemo },
  { name: 'Buttons (CSS Styles)', path: '/buttons', component: ButtonsDemo },
  { name: 'Device Motion', path: '/motion', component: MotionDemo },
  { name: 'Device Orientation', path: '/orientation', component: OrientationDemo },
  { name: 'Haptics', path: '/haptics', component: HapticsDemo },
  { name: 'Particles', path: '/particles', component: ParticlesDemo },
  { name: 'Animals (Speech)', path: '/animals', component: AnimalsDemo },
];

export const desktop = [
  { name: 'Platform Game (Collisions)', path: '/platformer', component: PlatformerDemo },
  { name: 'Multiplayer (Split-screen) ', path: '/multiplayer', component: MultiplayerDemo },
  { name: 'Lighting Effects', path: '/lighting', component: LightingDemo },
  { name: 'Viewport Scaling', path: '/viewport-scale', component: ViewportScaleDemo },
];
