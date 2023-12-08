import { useCallback } from "react";
import { Position, useProperty, useMouse, useTouch, useWorld, dist, useUpdate } from "@engine";
import { BallState } from "../state";
import { Ball } from "./Ball";

const EVENT_COOLDOWN = 100;

const RADIUS_TOLERANCE = 10;

type BallsProps = {
  balls: BallState[];
  onAdd: (pos: Position) => void;
  onRemove: (ball: BallState) => void;
};

export const Balls: React.FC<BallsProps> = ({ balls, onAdd, onRemove }) => {
  const cooldown = useProperty(0);
  const mouse = useMouse();
  const touch = useTouch();
  const world = useWorld();

  /**
   * Create a new ball at the given position, unless there is already a ball there, in which case
   * it is removed. Also, set a cooldown period, to prevent tap and click events from creating two
   * balls when they occur in different frames.
   */
  const handleTapOrClick = useCallback((pos: Position) => {
    cooldown.current = EVENT_COOLDOWN;

    for (const ball of balls) {
      if (dist(pos, ball.pos.current) <= ball.radius.current + RADIUS_TOLERANCE) {
        onRemove(ball);
        return;
      }
    }
    onAdd(pos);
  }, [balls, cooldown, onAdd, onRemove]);

  /**
   * Check for touch or mouse events, creating an removing balls as appropriate. If no such event
   * occurs, reduce the cooldown, ready for accepting new events.
   */
  useUpdate((delta) => {
    if (cooldown.current === 0) {
      if (touch.isPressed()) {
        handleTapOrClick(world.touch.current);
      } else if (mouse.isPressed(0)) {
        handleTapOrClick(world.mouse.current);
      }
    } else {
      cooldown.current = Math.max(0, cooldown.current - delta);
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
