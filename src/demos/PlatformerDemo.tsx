import { Device, Engine, Viewport, World } from "@engine";
import { Collectibles, PlatformGame, LevelGeometry, Player, ScoreUI, Close } from "../components";

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
        </PlatformGame>
        <Close />
      </Device>
    </Engine>
  );
};
