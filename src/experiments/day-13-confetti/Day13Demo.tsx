import { Device, Engine, ParticleEngine, Particles, usePointer, useUpdate } from "@overreact/engine";
import { useConfetti } from "./useConfetti";

export const Day13Demo = () => {
  return (
    <Engine>
      <ParticleEngine pool={400}>
        <Device bg="black" showFPS>
          <Confetti />
        </Device>
      </ParticleEngine>
    </Engine>
  );
};

const Confetti = () => {
  const pointer = usePointer();
  const confetti = useConfetti();

  useUpdate(() => {
    if (pointer.isPressed()) {
      confetti.trigger(pointer.pos.current);
    }
  });

  return <Particles />;
};
