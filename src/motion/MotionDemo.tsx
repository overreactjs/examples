import { Device, Engine, useElement, useMotion, useProperty, useRender, useUpdate } from "@overreact/engine";

export const MotionDemo = () => {
  return (
    <Engine>
      <Device mode="mobile">
        <MotionGame />
      </Device>
    </Engine>
  );
};

const MotionGame: React.FC = () => {
  const element = useElement();
  const motion = useMotion();
  const shaking = useProperty(0);

  useUpdate((delta) => {
    shaking.current = motion.isShaking() ? 100 : Math.max(0, shaking.current - delta);
  });

  useRender(() => {
    if (shaking.invalidated) {
      element.setStyle('background-color', shaking.current > 0 ? '#0f0' : '#bbb');
      shaking.invalidated = false;
    }
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-16">
        <div className="font-[quicksand] font-bold text-2xl text-slate-900">Try shaking<br />your device!</div>
        <div ref={element.ref} className="w-32 h-32 rounded-full" />
      </div>
    </div>
  );
};
