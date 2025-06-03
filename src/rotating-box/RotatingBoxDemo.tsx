import { Box, Device, Engine, Position, Size, Viewport, World, useDynamicProperty, useProperty, useUpdate } from "@overreact/engine";

export const RotatingBoxDemo = () => {
  return (
    <Engine>
      <Device>
        <Viewport>
          <World>
            <RotatingBox />
          </World> 
        </Viewport>
      </Device>
    </Engine>
  );
};

const RotatingBox: React.FC = () => {
  const time = useProperty(0);
  const size = useProperty<Size>([200, 200]);
  const angle = useProperty(0);
  const hue = useProperty(0);
  const pos = useDynamicProperty(size, ([w, h]): Position => [-w / 2, -h / 2]);
  const color = useDynamicProperty(hue, (hue) => `hsl(${hue}deg 100% 50%)`);

  useUpdate((delta) => {
    time.current += delta;
    const width = Math.sin(time.current / 1000) * 100 + 200;
    size.current = [width, width];
    size.current[1] = width;
    angle.current += 1;
    hue.current = (hue.current + 1) % 360;
  });

  return <Box pos={pos} size={size} angle={angle} color={color} />
};
