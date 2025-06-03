import { Prop, Position, usePosition, useProperty, Size, Circle, useDynamicProperty, useCirclePhysics } from "@overreact/engine";

type BlobProps = {
  pos: Prop<Position>;
  radius: Prop<number>;
  color: Prop<string>;
};

export const Blob: React.FC<BlobProps> = (props) => {
  const pos = usePosition(props.pos);
  const radius = useProperty(props.radius);
  const color = useProperty(props.color);

  const circlePos = useDynamicProperty(pos, (pos): Position => [
    pos[0] - radius.current,
    pos[1] - radius.current,
  ]);

  const circleSize = useDynamicProperty(radius, (radius): Size => [radius * 2, radius * 2]);

  useCirclePhysics(pos, radius, { friction: 0.75, restitution: 0.5, slop: 0.05 });

  return <Circle pos={circlePos} size={circleSize} color={color} />;
};
