import { Box, Device, Engine, Viewport, World, useOffsetPosition } from "@overreact/engine";
import { Collectibles, Flame, LevelGeometry, PlatformGame, Player, usePlatformGame } from "./components";

export const LightingDemo = () => {
  return (
    <Engine>
      <Device bg="#001122" showFPS>
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
        </PlatformGame>
      </Device>
    </Engine>
  );
};

const Lighting: React.FC = () => {
  const game = usePlatformGame();
  const lightPos = useOffsetPosition(game.current.players[0].pos, [500, 460]);

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


