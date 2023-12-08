import { Box, Circle, Engine, Position, Prop, Size, Viewport, World, useDynamicProperty, useOffsetPosition, usePosition, useProperty, useUpdate } from "@engine";
import { Collectibles, Game, LevelGeometry, Player, ScoreUI } from "../components";
import { useGame } from "../components/Game";

export const LightingDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
        <Game>
          <Viewport>
            <World>
              <Box pos={[-800, -800]} size={[1600, 1600]} color="#001122" />
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
              <Lighting />
            </World>
          </Viewport>
          <ScoreUI />
        </Game>
      </Engine>
    </div>
  );
};

const Lighting: React.FC = () => {
  const game = useGame();
  const pos = usePosition(game.current.players[0].pos);
  const lightPos = useOffsetPosition(pos, [500, 460]);

  return (
    <Box pos={[-800, -800]} size={[1600, 1600]} color="black" className="mix-blend-multiply">
      <Flame pos={lightPos} size={[600, 600]} />
      <Flame pos={[950, 400]} size={[400, 400]} />
      <Flame pos={[250, 400]} size={[400, 400]} />
    </Box>
  );
};

const FRAMES = [1.00, 1.02, 0.96, 1.04, 0.98];

type FlameProps = {
  pos?: Prop<Position>;
  size: Prop<Size>;
};

const Flame: React.FC<FlameProps> = (props) => {
  const pos = usePosition(props.pos);
  const size = useProperty(props.size);
  const scale = useProperty(1);
  const frameTime = useProperty<number>(Math.random() * 400);

  const scaledSize = useDynamicProperty(size, ([w, h]): Size => ([
    w * scale.current,
    h * scale.current,
  ]));

  const scaledPos = useDynamicProperty(pos, ([x, y]): Position => ([
    x - (scale.current - 1) * size.current[0] / 2,
    y - (scale.current - 1) * size.current[1] / 2,
  ]));

  useUpdate((delta) => {
    frameTime.current += delta;
    const frame = Math.floor(frameTime.current / 200) % FRAMES.length;
    scale.current = FRAMES[frame];
  });

  return (
    <Circle pos={scaledPos} size={scaledSize} color="black" className="!bg-[radial-gradient(#ffc_0%,_black_70%)] mix-blend-screen" />
  );
};
