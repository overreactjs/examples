import { Device, Engine, Viewport, World } from "@overreact/engine";
import { Collectibles, PlatformGame, LevelGeometry, Player, ScoreUI, OnscreenController } from "./components";

export const PlatformerDemo = () => {
  return (
    <Engine>
      <Device bg="#001122">
        <PlatformGame>
          <Viewport>
            <World>
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
            </World>
          </Viewport>
          <ScoreUI />
          <OnscreenController />
        </PlatformGame>
      </Device>
    </Engine>
  );
};
