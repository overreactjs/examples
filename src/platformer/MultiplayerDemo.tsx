import { Device, Engine, Viewport, VirtualInput, World } from "@overreact/engine";
import { Collectibles, LevelGeometry, PassivePlayer, PlatformGame, Player } from "./components";

export const MultiplayerDemo = () => {
  return (
    <Engine>
      <PlatformGame>
        <Device bg="black" mode="desktop" showFPS>
          <div className="w-full h-full grid grid-cols-2 box-border p-8 gap-8">
            <div className="w-full h-full border-4 border-red-500 box-border rounded-xl overflow-hidden bg-[#001122]">
              <Viewport>
                <World>
                  <LevelGeometry />
                  <Collectibles />
                  <VirtualInput>
                    <Player index={0} showLabels />
                  </VirtualInput>
                  <PassivePlayer index={1} />
                </World>
              </Viewport>
            </div>
            <div className="w-full h-full border-4 border-cyan-500 box-border rounded-xl overflow-hidden bg-[#001122]">
              <Viewport>
                <World>
                  <LevelGeometry />
                  <Collectibles />
                  <VirtualInput>
                    <Player index={1} showLabels />
                  </VirtualInput>
                  <PassivePlayer index={0} />
                </World>
              </Viewport>
            </div>
          </div>
        </Device>
      </PlatformGame>
    </Engine>
  );
};
