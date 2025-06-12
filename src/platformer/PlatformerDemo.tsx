import { Device, Engine, Viewport, World } from "@overreact/engine";
import { Collectibles, PlatformGame, LevelGeometry, Player, ScoreUI } from "./components";

export const PlatformerDemo = () => {
  return (
    <Engine>
      <Device bg="#001122" showFPS>
        <PlatformGame>
          <Viewport>
            <World>
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
            </World>
          </Viewport>
          <ScoreUI />
        </PlatformGame>
      </Device>
    </Engine>
  );
};
