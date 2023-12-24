import { ChangeEvent } from "react";
import { Engine, Prop, Viewport, World, useKeyPressed, useProperty, useSync } from "@overreact/engine";
import { Collectibles, PlatformGame, LevelGeometry, Player } from "./components";

export const ViewportScaleDemo = () => {
  const scale = useProperty(1);

  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
        <PlatformGame>
          <Viewport scale={scale}>
            <World>
              <LevelGeometry />
              <Collectibles />
              <Player index={0} />
            </World>
          </Viewport>
          <Slider scale={scale} />
        </PlatformGame>
      </Engine>
    </div>
  );
};

type SliderProps = {
  scale: Prop<number>;
};

const Slider: React.FC<SliderProps> = (props) => {
  const scale = useProperty(props.scale);
  const value = useSync(() => scale.current);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    scale.current = parseFloat(event.target.value);
  };

  useKeyPressed('Minus', () => {
    scale.current = Math.max(1, scale.current - 0.1);
  });

  useKeyPressed('Equal', () => {
    scale.current = Math.min(3, scale.current + 0.1);
  });

  return (
    <div className="absolute top-8 left-8 text-xl text-white flex items-center gap-4">
      <input type="range" min={0.5} max={3} step={0.1} value={value} onChange={onChange} />
      <span>&times;{value?.toFixed(1)}</span>
    </div>
  );
};