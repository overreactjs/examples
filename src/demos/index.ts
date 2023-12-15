import { BuddyDemo } from "./buddy";
import { MarbleJarDemo } from "./marble-jar";
import { MotionDemo } from "./motion";
import { OrientationDemo } from "./orientation";
import { PairsDemo } from "./pairs";
import { LightingDemo, MultiplayerDemo, PlatformerDemo, ViewportScaleDemo } from "./platformer";
import { RotatingBoxDemo } from "./rotating-box";

export const mobile = [
  { name: 'Rotating Box', path: '/rotating-box', component: RotatingBoxDemo },
  { name: 'Buddy (Sprite Animation)', path: '/buddy', component: BuddyDemo },
  { name: 'Marble Jar (Physics)', path: '/physics', component: MarbleJarDemo },
  { name: 'Pairs (Events)', path: '/pairs', component: PairsDemo },
  { name: 'Platform Game (Collisions)', path: '/platformer', component: PlatformerDemo },
  { name: 'Lighting Effects', path: '/lighting', component: LightingDemo },
  { name: 'Device Motion', path: '/motion', component: MotionDemo },
  { name: 'Device Orientation', path: '/orientation', component: OrientationDemo },
];

export const desktop = [
  { name: 'Multiplayer (Split-screen) ', path: '/multiplayer', component: MultiplayerDemo },
  { name: 'Viewport Scaling', path: '/viewport-scale', component: ViewportScaleDemo },
];
