import { Prop, useElement, useKeyAxis, useKeyPressed, useProperty, useRender , useShaker } from "@engine";

type DeviceProps = {
  children: React.ReactNode;
  angle?: Prop<number>;
  allowShake?: boolean;
  allowTilt?: boolean;
};

export const Device: React.FC<DeviceProps> = ({ children, ...props }) => {
  const device = useElement<HTMLDivElement>();
  const { ref: shaker, shake } = useShaker();
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
    <div className="engine">
      <div className="engine-device" ref={shaker}>
        <div className="engine-screen" ref={device.ref}>
          {children}
        </div>
      </div>
    </div>
  );
};
