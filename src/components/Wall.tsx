import { Box, Node, Prop, Position, Size, usePosition, useProperty, useDynamicProperty, PhysicsBox } from "@engine";

type WallProps = {
  pos: Prop<Position>;
  size: Prop<Size>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const pos = usePosition(props.pos);
  const size = useProperty(props.size);

  const boxPos = useDynamicProperty(pos, (pos): Position => [
    pos[0] - size.current[0] / 2,
    pos[1] - size.current[1] / 2,
  ]);

  return (
    <Node>
      <Box pos={boxPos} size={size} color="transparent" />
      <PhysicsBox pos={pos} size={size} static />
    </Node>
  );
};