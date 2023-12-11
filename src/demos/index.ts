import { EmptyDemo } from "./EmptyDemo";
import { CardsDemo } from "./CardsDemo";
import { LightingDemo } from "./LightingDemo";
import { MultiplayerDemo } from "./MultiplayerDemo";
import { PhysicsDemo } from "./PhysicsDemo";
import { PlatformerDemo } from "./PlatformerDemo";
import { RotatingBoxDemo } from "./RotatingBoxDemo";
import { ViewportScaleDemo } from "./ViewportScaleDemo";

export const demos = [
  { name: 'Empty', path: '/empty', component: EmptyDemo },
  { name: 'Rotating Box', path: '/rotating-box', component: RotatingBoxDemo },
  { name: 'Platform game (collisions)', path: '/platformer', component: PlatformerDemo },
  { name: 'Multiplayer (split-screen) ', path: '/multiplayer', component: MultiplayerDemo },
  { name: 'Lighting effects', path: '/lighting', component: LightingDemo },
  { name: 'Viewport scale', path: '/viewport-scale', component: ViewportScaleDemo },
  { name: 'Physics (Marble Jar)', path: '/physics', component: PhysicsDemo },
  { name: 'Card Game (Pairs)', path: '/input', component: CardsDemo },
];