import { randi } from "@overreact/engine";
import { Position, usePosition, useProperty, useDynamicProperty, Size, useCirclePhysics, Circle } from "@overreact/engine";
import { useState } from "react";

export const Balls = () => {
  const [balls] = useState<Position[]>(() => {
    const result: Position[] = [];

    for (let i = 0; i < 50; i++) {
      const x = (randi(12) + 0.5) * 64;
      const y = (randi(12) + 0.5) * 64;
      result.push([x, y]);
    }

    return result;
  });

  return (
    <>
      {balls.map((pos, index) => <Ball key={index} pos={pos} radius={15} />)}
    </>
  );
};

const Ball = (props: { pos: Position, radius: number }) => {
  const pos = usePosition(props.pos);
  const radius = useProperty(props.radius);

  const circlePos = useDynamicProperty(pos, (pos): Position => [
    pos[0] - radius.current,
    pos[1] - radius.current,
  ]);

  const circleSize = useDynamicProperty(radius, (radius): Size => [radius * 2, radius * 2]);

  useCirclePhysics(pos, radius, {
    friction: 0.001, 
    frictionStatic: 0,
    restitution: 0.99,
    slop: 0.05,
    density: 0.01,
  });

  return <Circle pos={circlePos} size={circleSize} color="#FFC40F" />;
};
