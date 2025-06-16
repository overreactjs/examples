import { Device, Engine, Physics, Tilemap, useElement, useKeyPressed, usePhysicsEngine, useProperty, useRender, useUpdate } from "@overreact/engine";
import { Balls } from "./Balls";
import { Walls } from "./Walls";
import { useMaze } from "./useMaze";
import { TILESET } from "./constants";

export const Day10Demo = () => {
  return (
    <Engine>
      <Physics>
        <Device bg="#3A445C" showFPS>
          <div className="w-full h-full grid place-items-center">
            <Maze />
          </div>
        </Device>
      </Physics>
    </Engine>
  );
};

/**
 * Render the maze using a tilemap, and continuously generate it, waiting a couple of seconds when
 * one maze is complete, before generating a new one.
 */
const Maze = () => {
  const physics = usePhysicsEngine();
  
  const container = useElement();

  const { tiles, walls } = useMaze();
  const angle = useProperty(45);
  const direction = useProperty(1);

  useUpdate((delta) => {
    const rads = angle.current * Math.PI / 180;
    physics.setGravity([Math.sin(rads), Math.cos(rads)]);
    angle.current += direction.current * delta / 30;
  });

  useKeyPressed('Space', () => {
    direction.current = 0 - direction.current;
  });

  useRender(() => {
    if (angle.invalidated) {
      angle.invalidated = false;
      container.setStyle('transform', `scale(0.75) rotate(${angle.current}deg)`);
    }
  });

  return (
    <div ref={container.ref} className="w-[768px] h-[768px] outline-[4px] outline outline-[#FFE5A5] bg-[#3A445C] rounded-sm">
      <Tilemap tileset={TILESET} tiles={tiles} />
      <Balls />
      <Walls walls={walls} />
    </div>
  );
};



