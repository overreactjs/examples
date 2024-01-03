import { Device, Engine, Viewport, World } from "@overreact/engine";
import { Chunk, Player } from "./components";

import CHUNK_0_0 from "./data/chunk_0_0.json";
import CHUNK_1_0 from "./data/chunk_1_0.json";
import CHUNK_0_1 from "./data/chunk_0_1.json";
import CHUNK_1_1 from "./data/chunk_1_1.json";

export const RpgDemo = () => {
  return (
    <Engine>
      <Device bg="#36a6e0" showFPS>
        <Viewport>
          <World>
            <Chunk pos={[0, 0]} data={CHUNK_0_0} />
            <Chunk pos={[1, 0]} data={CHUNK_1_0} />
            <Chunk pos={[0, 1]} data={CHUNK_0_1} />
            <Chunk pos={[1, 1]} data={CHUNK_1_1} />
            <Player />
          </World>
        </Viewport>
      </Device>
    </Engine>
  );
};
