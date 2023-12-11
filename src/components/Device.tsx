import { Prop, useElement, useKeyAxis, useKeyPressed, useProperty, useRender } from "@engine";
import { useShake } from "../hooks";

type DeviceProps = {
  children: React.ReactNode;
  angle?: Prop<number>;
  allowShake?: boolean;
  allowTilt?: boolean;
};

export const Device: React.FC<DeviceProps> = ({ children, ...props }) => {
  const device = useElement<HTMLDivElement>();
  const { ref: shaker, shake } = useShake<HTMLDivElement>();
  const angle = useProperty(props.angle || 0);
  
  useKeyPressed('KeyS', () => {
    if (props.allowShake) {
      shake();
    }
  });

  useKeyAxis('KeyG', 'KeyH', (value) => {
    if (props.allowTilt && value !== 0) {
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
