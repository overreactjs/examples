import { useLayoutEffect, useState } from "react";
import { BitmapImage, Box, Device, Engine, Node, Position, Prop, useProperty, useUpdate } from "@overreact/engine";
import { IMAGE, PLAYER } from "./assets";
import { Screen, ZXPaper, ZXPen, ZXSprite } from "./components";
import { ZXPortals } from "./components/ZXPortals";

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
            {active && <Game />}
            <ZXPortals />
          </Screen>
        </Device>
      </Engine>
    </div>
  );
};

const Game: React.FC = () => {
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
      <Foo paper="#00f" pen="#f0f" pos={[32, 48]} />
      <Foo paper="#ff0" pen="#f00" pos={[48, 64]} />
      <Foo paper="#0f0" pen="#00f" pos={[64, 80]} />
      <Foo paper="#0ff" pen="#ff0" pos={[80, 96]} />
      <Foo paper="#f0f" pen="#00f" pos={[96, 112]} />

      <Foo paper="#0ff" pen="#f00" pos={[128, 48]} />
      <Foo paper="#00f" pen="#0f0" pos={[144, 64]} />
      <Foo paper="#f0f" pen="#ff0" pos={[160, 80]} />
      <Foo paper="#f00" pen="#00f" pos={[176, 96]} />
      <Foo paper="#ff0" pen="#0ff" pos={[192, 112]} />

      <Bar pos={pos1} />
      <Bar pos={pos2} />
      <Bar pos={pos3} />
      <Bar pos={pos4} />
    </>
  );
};

type FooProps = {
  pos: Prop<Position>;
  paper: string;
  pen: string;
};

const Foo: React.FC<FooProps> = ({ pos, paper, pen }) => {
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

type BarProps = {
  pos: Prop<Position>;
};

const Bar: React.FC<BarProps> = ({ pos }) => {
  return (
    <Node pos={pos}>
      <ZXSprite>
        <BitmapImage image={PLAYER} size={[32, 32]} offset={[0, 0]} />
      </ZXSprite>
    </Node>
  );
};