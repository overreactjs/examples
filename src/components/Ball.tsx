import { Prop, Position, usePosition, useProperty, Size, Circle, Node, PhysicsCircle, useDynamicProperty } from "@engine";

type BallProps = {
  pos: Prop<Position>;
  radius: Prop<number>;
  color: string;
};

export const Ball: React.FC<BallProps> = (props) => {
  const pos = usePosition(props.pos);
  const radius = useProperty(props.radius);

  const circlePos = useDynamicProperty(pos, (pos): Position => [
    pos[0] - radius.current,
    pos[1] - radius.current,
  ]);

  const circleSize = useDynamicProperty(radius, (radius): Size => [radius * 2, radius * 2]);

  return (
    <Node>
      <Circle pos={circlePos} size={circleSize} color={props.color} />
      <PhysicsCircle pos={pos} radius={radius} />
    </Node>
  );
};
