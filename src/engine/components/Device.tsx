import { useLayoutEffect, useMemo } from "react";
import { DeviceContext, Prop, Size, useElement, useKeyAxis, useKeyPressed, useProperty, useRender , useShaker } from "@engine";

type DeviceProps = {
  children: React.ReactNode;
  angle?: Prop<number>;
  allowShake?: boolean;
  allowTilt?: boolean;
  bg?: string;
};

export const Device: React.FC<DeviceProps> = ({ children, bg = 'white', ...props }) => {
  const device = useShaker();
  const screen = useElement<HTMLDivElement>();
  const size = useProperty<Size>([0, 0]);
  const angle = useProperty(props.angle || 0);
  
  useKeyPressed('KeyS', () => {
    if (props.allowShake) {
      device.shake();
    }
  });

  useKeyAxis('KeyG', 'KeyH', (value) => {
    if (props.allowTilt && value !== 0) {
      angle.current += value * 2;
    }
  });

  useRender(() => {
    screen.setBaseStyles({ angle });
  });

  useLayoutEffect(() => {
    if (screen.ref.current) {
      const observer = new ResizeObserver((entries) => {
        size.current[0] = entries[0].contentRect.width;
        size.current[1] = entries[0].contentRect.height;
      });

      observer.observe(screen.ref.current);
    }
  }, []);

  const context = useMemo(() => ({
    size,
  }), [size]);

  return (
    <DeviceContext.Provider value={context}>
      <div className="engine">
        <div className="engine-device" ref={device.ref}>
          <div className="engine-screen shadow-2xl" style={{ background: bg }} ref={screen.ref}>
            {children}
          </div>
        </div>
      </div>
    </DeviceContext.Provider>
  );
};
