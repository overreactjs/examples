import { useLayoutEffect, useState } from "react";
import { BitmapImage, Box, Device, Engine, Node, Position, Prop, useProperty, useUpdate } from "@overreact/engine";
import { IMAGE, PLAYER } from "./assets";
import { Screen, ZXPaper, ZXPen, ZXPortals, ZXSprite } from "./components";

const FACTOR = 1000;

export const Day4Demo = () => {
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    if (!active) {
      setActive(true);
    }
  }, [active]);

  return (
    <div className="w-screen h-screen">
      <Engine>
        <Device bg="black" showFPS>
          <Screen size={[256, 192]} scale="auto">
            {active && <Scene />}
            <ZXPortals />
          </Screen>
        </Device>
      </Engine>
    </div>
  );
};

const Scene = () => {
  const time = useProperty(0);
  const pos1 = useProperty<Position>([0, 0]);
  const pos2 = useProperty<Position>([0, 0]);
  const pos3 = useProperty<Position>([0, 0]);
  const pos4 = useProperty<Position>([0, 0]);

  useUpdate((delta) => {
    time.current += delta;

    const x1 = Math.round(Math.sin(time.current / FACTOR) * 64);
    const y1 = Math.round(Math.cos(time.current / FACTOR) * 64);

    const x2 = Math.round(Math.sin(time.current / (FACTOR / 2)) * 32);
    const y2 = Math.round(Math.cos(time.current / (FACTOR / 2)) * 32);

    pos1.current = [x1 + 112, y1 + 80];
    pos2.current = [112 - x1, 80 - y1];

    pos3.current = [y2 + 112, x2 + 80];
    pos4.current = [112 - y2, 80 - x2];
  });

  return (
    <>
      <BackgroundSprite paper="#00f" pen="#f0f" pos={[32, 48]} />
      <BackgroundSprite paper="#ff0" pen="#f00" pos={[48, 64]} />
      <BackgroundSprite paper="#0f0" pen="#00f" pos={[64, 80]} />
      <BackgroundSprite paper="#0ff" pen="#ff0" pos={[80, 96]} />
      <BackgroundSprite paper="#f0f" pen="#00f" pos={[96, 112]} />

      <BackgroundSprite paper="#0ff" pen="#f00" pos={[128, 48]} />
      <BackgroundSprite paper="#00f" pen="#0f0" pos={[144, 64]} />
      <BackgroundSprite paper="#f0f" pen="#ff0" pos={[160, 80]} />
      <BackgroundSprite paper="#f00" pen="#00f" pos={[176, 96]} />
      <BackgroundSprite paper="#ff0" pen="#0ff" pos={[192, 112]} />

      <ForegroundSprite pos={pos1} />
      <ForegroundSprite pos={pos2} />
      <ForegroundSprite pos={pos3} />
      <ForegroundSprite pos={pos4} />
    </>
  );
};

type BackgroundSpriteProps = {
  pos: Prop<Position>;
  paper: string;
  pen: string;
};

const BackgroundSprite = ({ pos, paper, pen }: BackgroundSpriteProps) => {
  return (
    <Node pos={pos}>
      <ZXPaper>
        <Box color={paper} size={[32, 32]} />
      </ZXPaper>
      <ZXPen>
        <Box color={pen} size={[32, 32]} />
      </ZXPen>
      <ZXSprite>
        <BitmapImage image={IMAGE} size={[32, 32]} offset={[0, 0]} />
      </ZXSprite>
    </Node>
  );
};

type ForegroundSpriteProps = {
  pos: Prop<Position>;
};

const ForegroundSprite = ({ pos }: ForegroundSpriteProps) => {
  return (
    <Node pos={pos}>
      <ZXSprite>
        <BitmapImage image={PLAYER} size={[32, 32]} offset={[0, 0]} />
      </ZXSprite>
    </Node>
  );
};