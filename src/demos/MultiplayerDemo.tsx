import { Engine, Physics, Viewport, World } from "@engine";
import { Collectibles, Game, LevelGeometry, PassivePlayer, Player } from "../components";

export const MultiplayerDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
        <Game>
          <div className="w-full h-full grid grid-cols-2 box-border p-8 gap-8">
            <div className="w-full h-full border-4 border-red-500 box-border rounded-xl overflow-hidden">
              <Viewport>
                <World>
                  <Physics>
                    <LevelGeometry />
                    <Collectibles />
                    <Player index={0} showLabels />
                    <PassivePlayer index={1} />
                  </Physics>
                </World>
              </Viewport>
            </div>
            <div className="w-full h-full border-4 border-cyan-500 box-border rounded-xl overflow-hidden">
              <Viewport>
                <World>
                  <LevelGeometry />
                  <Collectibles />
                  <Player index={1} showLabels />
                  <PassivePlayer index={0} />
                </World>
              </Viewport>
            </div>
          </div>
        </Game>
      </Engine>
    </div>
  );
};
