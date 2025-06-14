import { clamp, Device, dist, Engine, Size, useElement, usePointer, useProperty, useRender, useUpdate } from "@overreact/engine";

export const Day5Demo = () => {
  const dots = (new Array(640)).fill(true);

  return (
    <Engine>
      <Device bg="black" showFPS>
        <div className="w-full h-full grid content-center bg-black">
          <div className="w-full h-full grid grid-cols-[repeat(32,minmax(0,1fr));] gap-2 p-16 box-border">
            {(dots || []).map((_, index) => (
              <Dot key={index} />
            ))}
          </div>
        </div>
      </Device>
    </Engine>
  );
};

const Dot = () => {
  const pointer = usePointer();
  const element = useElement();
  const scale = useProperty(0.5);
  const offset = useProperty<Size>([0, 0]);
  const color = useProperty<[number, number, number]>([255, 0, 0]);

  useUpdate(() => {
    const x = (element.ref.current?.offsetLeft || 0) + (element.ref.current?.offsetWidth || 0) / 2;
    const y = (element.ref.current?.offsetTop || 0) + (element.ref.current?.offsetHeight || 0) / 2;
    const dx = pointer.pos.current[0] - x;
    const dy = pointer.pos.current[1] - y;
    const d = dist(pointer.pos.current, [x, y]) / 0.85;
    scale.current = clamp(Math.log(300 / d), 0.5, 2);

    const angle = Math.atan2(dx, dy);
    const pull = clamp(10000 / d, 0, d);
    offset.current = [-Math.sin(angle) * pull, -Math.cos(angle) * pull];

    const r = clamp(510 - d, 0, 255) || 0;
    const g = clamp(765 - d / 1.75, 0, 255) || 0;
    const b = clamp(Math.abs(255 - d / 1.5), 0, 255) || 0;
    color.current = [r, g, b];
  });

  useRender(() => {
    if (scale.invalidated || offset.invalidated || color.invalidated) {
      scale.invalidated = false;
      offset.invalidated = false;
      color.invalidated = false;

      if (element.ref.current) {
        element.setStyle('transform', `translate(${offset.current[0]}px, ${offset.current[1]}px) scale(${scale.current}, ${scale.current})`);
        element.setStyle('background', `rgb(${color.current[0]}, ${color.current[1]}, ${color.current[2]})`);
      }
    }
  });
  
  return (
    <div ref={element.ref} className="w-full h-full aspect-square rounded-full" />
  );
};
