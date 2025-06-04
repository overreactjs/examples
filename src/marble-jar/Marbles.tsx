import { Position, useWorld, usePointer, useFixedUpdate } from "@overreact/engine";
import { MarbleState } from "./MarbleState";
import { Marble } from "./Marble";

type MarblesProps = {
  marbles: MarbleState[];
  onAdd: (pos: Position) => void;
  onRemove: (marble: MarbleState) => void;
};

export const Marbles: React.FC<MarblesProps> = ({ marbles, onAdd }) => {
  const pointer = usePointer();
  const world = useWorld();

  /**
   * Create a new marble at the given mouse/pointer position.
   */
  useFixedUpdate(15, () => {
    if (pointer.isDown()) {
      const [x, y] = world.pointer.current;
      onAdd([x + Math.random() * 10 - 5, y + Math.random() * 10 - 5]);
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
