import { Box, Engine, Viewport, World, useOffsetPosition, usePosition } from "@engine";
import { Collectibles, Flame, PlatformGame, LevelGeometry, Player, ScoreUI } from "../components";
import { usePlatformGame } from "../components/PlatformGame";

export const LightingDemo = () => {
  return (
    <div className="w-screen h-screen bg-[#001122]">
      <Engine>
        <PlatformGame>
          <Viewport>
            <World>
              <Box pos={[-800, -800]} size={[1600, 1600]} color="black" />
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
              <Lighting />
            </World>
          </Viewport>
          <ScoreUI />
        </PlatformGame>
      </Engine>
    </div>
  );
};

const Lighting: React.FC = () => {
  const game = usePlatformGame();
  const pos = usePosition(game.current.players[0].pos);
  const lightPos = useOffsetPosition(pos, [500, 460]);

  return (
    <>
      <Box pos={[-800, -800]} size={[1600, 1600]} color="black" className="mix-blend-hard-light">
        <Flame pos={lightPos} size={[600, 600]} />
        <Flame pos={[950, 400]} size={[400, 400]} />
        <Flame pos={[250, 400]} size={[400, 400]} />
      </Box>
      <Box pos={[-800, -800]} size={[1600, 1600]} color="#001122" className="mix-blend-lighten" />
    </>
  );
};


