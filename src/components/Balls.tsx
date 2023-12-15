import { Position, useMouse, useWorld, dist, useUpdate } from "@engine";
import { BallState } from "../state";
import { Ball } from "./Ball";

const RADIUS_TOLERANCE = 10;

type BallsProps = {
  balls: BallState[];
  onAdd: (pos: Position) => void;
  onRemove: (ball: BallState) => void;
};

export const Balls: React.FC<BallsProps> = ({ balls, onAdd, onRemove }) => {
  const mouse = useMouse();
  const world = useWorld();

  /**
   *  Create a new ball at the given position, unless there is already a ball there, in which case
   * it is removed.
   */
  useUpdate(() => {
    if (mouse.isPressed(0)) {
      for (const ball of balls) {
        if (dist(world.mouse.current, ball.pos.current) <= ball.radius.current + RADIUS_TOLERANCE) {
          onRemove(ball);
          return;
        }
      }
      onAdd(world.mouse.current);
    }
  });

  return (
    <>
      {balls.map(({ id, pos, radius, color }) => (
        <Ball key={id} pos={pos} radius={radius} color={color} />
      ))}
    </>
  )
};
