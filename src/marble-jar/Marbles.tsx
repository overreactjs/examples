import { Position, useWorld, dist, useUpdate, usePointer } from "@overreact/engine";
import { MarbleState } from "./MarbleState";
import { Marble } from "./Marble";

const RADIUS_TOLERANCE = 10;

type MarblesProps = {
  marbles: MarbleState[];
  onAdd: (pos: Position) => void;
  onRemove: (marble: MarbleState) => void;
};

export const Marbles: React.FC<MarblesProps> = ({ marbles, onAdd, onRemove }) => {
  const { isPressed } = usePointer();
  const world = useWorld();

  /**
   * Create a new marble at the given position, unless there is already a marble there, in which
   * case it is removed.
   */
  useUpdate(() => {
    if (isPressed()) {
      for (const marble of marbles) {
        if (dist(world.pointer.current, marble.pos.current) <= marble.radius.current + RADIUS_TOLERANCE) {
          onRemove(marble);
          return;
        }
      }
      onAdd(world.pointer.current);
    }
  });

  return (
    <>
      {marbles.map(({ id, pos, radius, color }) => (
        <Marble key={id} pos={pos} radius={radius} color={color} />
      ))}
    </>
  )
};
