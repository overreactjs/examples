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

export { experiments } from "./experiments";
