import { useContext, useState } from "react";
import { Body } from "matter-js";
import { Engine, Keyboard, Physics, PhysicsContext, Position, Viewport, useKeyAxis, useKeyPressed, useProperty } from "@engine";
import { Ball, Device, Wall } from "../components";
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

type BallState = {
  pos: Position;
  radius: number;
  color: string;
};

const PhysicsGame: React.FC = () => {
  const { engine, setGravity } = useContext(PhysicsContext);
  const [balls, setBalls] = useState<BallState[]>([]);
  const [hasWalls, setHasWalls] = useState(true);
  const angle = useProperty(0);

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
        Body.setVelocity(body, {
          x: Math.random() * 140 - 70,
          y: Math.random() * 180 - 90,
        });
      }
    }
  });

  // Press: "D": Toggle the wall devices at the ends.
  useKeyPressed('KeyD', () => {
    setHasWalls((hasBase) => !hasBase);
  });

  // Press "G"/"H": Rotate the device.
  useKeyAxis('KeyG', 'KeyH', () => {
    setGravity(angle.current);
  });
  
  return (
    <Device angle={angle}>
      <Viewport>
        <Wall pos={[-250, 0]} size={[100, 1000]} />
        <Wall pos={[250, 0]} size={[100, 1000]} />

        {hasWalls && <Wall pos={[0, 450]} size={[600, 100]} />}
        {hasWalls && <Wall pos={[0, -450]} size={[600, 100]} />}

        {balls.map(({ pos, radius, color }, index) => (
          <Ball key={index} pos={pos} radius={radius} color={color} />
        ))}
      </Viewport>
    </Device>
  );
};
