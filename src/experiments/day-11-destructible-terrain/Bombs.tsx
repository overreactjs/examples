import { Circle, Node, useSync } from "@overreact/engine";
import { BombState } from "./BombState";

export const Bombs = (props: { bombs: Set<BombState> }) => {
  const bombs = useSync(() => [...props.bombs]);

  return (
    <>
      {bombs.map((bomb) => (
        <Node key={bomb.id} pos={bomb.pos} offset={[-10, -10]}>
          <Circle size={[20, 20]} color="#333" />
        </Node>
      ))}
    </>
  );
};
