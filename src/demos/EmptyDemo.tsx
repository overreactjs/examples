import { useRef } from "react";
import { Device, Engine, useElement, useMotion, useRender, useUpdate } from "@engine";

export const EmptyDemo = () => {
  return (
    <Engine>
      <Device>
        <EmptyGame />
      </Device>
    </Engine>
  );
};

const EmptyGame: React.FC = () => {
  const element = useElement();
  const { activate, isShaking } = useMotion();
  const shaking = useRef(false);

  useUpdate(() => {
    shaking.current = isShaking();
  });

  useRender(() => {
    element.setStyle('backgroundColor', shaking.current ? '#0f0' : '#f00');
  });

  return (
    <div ref={element.ref} className="w-full h-full grid place-items-center">
      <button onClick={activate}>Activate</button>
    </div>
  );
};
