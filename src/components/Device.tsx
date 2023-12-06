import { Prop, useElement, useKeyAxis, useKeyPressed, useProperty, useRender } from "@engine";
import { useShake } from "../hooks";

type DeviceProps = {
  children: React.ReactNode;
  angle?: Prop<number>;
};

export const Device: React.FC<DeviceProps> = ({ children, ...props }) => {
  const device = useElement<HTMLDivElement>();
  const { ref: shaker, shake } = useShake();
  const angle = useProperty(props.angle || 0);
  
  useKeyPressed('KeyS', shake);

  useKeyAxis('KeyG', 'KeyH', (value) => {
    if (value !== 0) {
      angle.current += value * 2;
    }
  });

  useRender(() => {
    device.setBaseStyles({ angle });
  });

  return (
    <div ref={shaker} className="w-[400px] h-[800px]">
      <div ref={device.ref} className="w-full h-full bg-[#223344] relative rounded-3xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
