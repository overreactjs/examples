import { Box, Node, Position, Prop, Tilemap, useDynamicProperty, useProperty } from "@overreact/engine";
import { TILESET } from "../assets";

const SIZE = 16 * 16 * 4;

type ChunkProps = {
  pos: Prop<Position>;
  data: {
    tiles: number[];
  };
};

export const Chunk: React.FC<ChunkProps> = (props) => {
  const chunkPos = useProperty(props.pos);
  const worldPos = useDynamicProperty(chunkPos, (pos): Position => [(pos[0] - 1) * SIZE, (pos[1] - 1) * SIZE]);

  return (
    <Node pos={worldPos}>
      <Box size={[SIZE, SIZE]} color="#36a6e0" />
      <Tilemap tileset={TILESET} tiles={props.data.tiles} scale={4} />
    </Node>
  );
};
