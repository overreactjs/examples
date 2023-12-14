import { BuddyDemo } from "./BuddyDemo";
import { CardsDemo } from "./CardsDemo";
import { LightingDemo } from "./LightingDemo";
import { MotionDemo } from "./MotionDemo";
import { MultiplayerDemo } from "./MultiplayerDemo";
import { OrientationDemo } from "./OrientationDemo";
import { PhysicsDemo } from "./PhysicsDemo";
import { PlatformerDemo } from "./PlatformerDemo";
import { RotatingBoxDemo } from "./RotatingBoxDemo";
import { ViewportScaleDemo } from "./ViewportScaleDemo";

export const mobile = [
  { name: 'Rotating Box', path: '/rotating-box', component: RotatingBoxDemo },
  { name: 'Buddy (Sprite Animation)', path: '/buddy', component: BuddyDemo },
  { name: 'Marble Jar (Physics)', path: '/physics', component: PhysicsDemo },
  { name: 'Card Game (Tap Events)', path: '/input', component: CardsDemo },
  { name: 'Platform Game (Collisions)', path: '/platformer', component: PlatformerDemo },
  { name: 'Lighting Effects', path: '/lighting', component: LightingDemo },
  { name: 'Device Motion', path: '/motion', component: MotionDemo },
  { name: 'Device Orientation', path: '/orientation', component: OrientationDemo },
];

export const desktop = [
  { name: 'Multiplayer (Split-screen) ', path: '/multiplayer', component: MultiplayerDemo },
  { name: 'Viewport Scaling', path: '/viewport-scale', component: ViewportScaleDemo },
];
