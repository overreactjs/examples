import { useContext, useState } from "react";
import { Body } from "matter-js";
import { Engine, Keyboard, Physics, PhysicsContext, Position, Viewport, useElement, useKeyAxis, useKeyPressed, useProperty, useRender } from "@engine";
import { Ball, Wall } from "../components";
import { PALETTE_ISLAND_JOY_16 as COLORS } from "../constants";

export const PhysicsDemo = () => {
  return (
    <div className="w-screen h-screen grid place-content-center bg-black">
      <Keyboard>
        <Engine>
          <Physics>
            <PhysicsGame />
          </Physics>
        </Engine>
      </Keyboard>
    </div>
  );
};

const PhysicsGame: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const [balls, setBalls] = useState<Ball[]>([]);
  const [hasWalls, setHasWalls] = useState(true);
  const angle = useProperty(0);
  const { engine, setGravity } = useContext(PhysicsContext);

  // Press "A": Add a new ball.
  useKeyPressed('KeyA', () => {
    setBalls((balls) => [...balls, {
      pos: [Math.random() * 200 - 100, -300],
      radius: Math.random() * 25 + 15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }]);
  });

  // Press "S": Shake the device.
  useKeyPressed('KeyS', () => {
    for (const body of engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        Body.setVelocity(body, { x: Math.random() * 120 - 60, y: Math.random() * 120 - 60 });
      }
    }
  });

  // Press: "D": Toggle the wall devices at the ends.
  useKeyPressed('KeyD', () => {
    setHasWalls((hasBase) => !hasBase);
  });

  // Press "G"/"H": Rotate the device.
  useKeyAxis('KeyG', 'KeyH', (value) => {
    if (value !== 0) {
      angle.current += value * 2;
      setGravity(angle.current);
    }
  });

  useRender(() => {
    element.setBaseStyles({ angle });
  });
  
  return (
    <div ref={element.ref} className="w-[400px] h-[800px] bg-[#223344] relative rounded-3xl overflow-hidden">
      <Viewport>
        {hasWalls && (
          <>
            <Wall pos={[0, 450]} size={[600, 100]} />
            <Wall pos={[0, -450]} size={[600, 100]} />
          </>
        )}

        <Wall pos={[-250, 0]} size={[100, 1000]} />
        <Wall pos={[250, 0]} size={[100, 1000]} />
        
        {balls.map(({ pos, radius, color }, index) => (
          <Ball key={index} pos={pos} radius={radius} color={color} />
        ))}
      </Viewport>
    </div>
  );
};

type Ball = {
  pos: Position;
  radius: number;
  color: string;
};