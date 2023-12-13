import { Box, Device, Engine, Size, Viewport, World, useDynamicProperty, useProperty, useUpdate } from "@engine";

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
  const pos = useDynamicProperty(size, ([w, h]): Size => [-w / 2, -h / 2]);
  const color = useDynamicProperty(hue, (hue) => HSLToHex(hue, 100, 50));

  useUpdate((delta) => {
    time.current += delta;
    const width = Math.sin(time.current / 1000) * 100 + 200;
    size.current = [width, width];
    angle.current += 1;
    hue.current = (hue.current + 1) % 360;
  });

  return <Box pos={pos} size={size} angle={angle} color={color} />
};

function HSLToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const c: number = (1 - Math.abs(2 * l - 1)) * s;
  const x: number = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m: number = l - c/2;
  let r: number | string = 0;
  let g: number | string = 0; 
  let b: number | string = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}