import { Position, Size, usePosition, useProperty, useBoxPhysics } from "@overreact/engine";

export const Walls = ({ walls }: { walls: [Position, Size][] }) => (
  <>
    {walls.map(([pos, size], index) => <Wall key={index} pos={pos} size={size} />)}
  </>
);

const Wall = (props: { pos: Position, size: Size }) => {
  const pos = usePosition(props.pos);
  const size = useProperty(props.size);

  useBoxPhysics(pos, size, {
    friction: 0.01,
    frictionStatic: 0,
    restitution: 1,
    slop: 0.05,
    isStatic: true,
  });

  return null;
};
