import { Engine, Viewport, World } from "@engine";
import { Collectibles, PlatformGame, LevelGeometry, Player, ScoreUI } from "../components";

export const PlatformerDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
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
      </Engine>
    </div>
  );
};
