import { Circle, Position, Prop, Size, useDynamicProperty, usePosition, useProperty, useUpdate } from "@overreact/engine";

const CLASS_NAME = "!bg-[radial-gradient(#888_0%,_black_70%)] mix-blend-lighten";
const FRAMES = [1.00, 1.02, 0.96, 1.04, 0.98];

type FlameProps = {
  pos?: Prop<Position>;
  size: Prop<Size>;
};

export const Flame: React.FC<FlameProps> = (props) => {
  const pos = usePosition(props.pos);
  const size = useProperty(props.size);
  const scale = useProperty(1);
  const frameTime = useProperty<number>(Math.random() * 400);

  const scaledSize = useDynamicProperty(size, ([w, h]): Size => ([
    w * scale.current,
    h * scale.current,
  ]));

  const scaledPos = useDynamicProperty(pos, ([x, y]): Position => ([
    x - (scale.current - 1) * size.current[0] / 2,
    y - (scale.current - 1) * size.current[1] / 2,
  ]));

  useUpdate((delta) => {
    frameTime.current += delta;
    const frame = Math.floor(frameTime.current / 200) % FRAMES.length;
    scale.current = FRAMES[frame];
  });

  return (
    <Circle pos={scaledPos} size={scaledSize} color="black" className={CLASS_NAME} />
  );
};