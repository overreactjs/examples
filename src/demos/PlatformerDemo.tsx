import { Engine, Viewport, World } from "@engine";
import { Collectibles, Game, LevelGeometry, Player, ScoreUI } from "../components";

export const PlatformerDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
        <Game>
          <Viewport>
            <World>
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
            </World>
          </Viewport>
          <ScoreUI />
        </Game>
      </Engine>
    </div>
  );
};


