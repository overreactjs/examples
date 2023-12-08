import { useCallback, useState } from "react";
import { Body } from "matter-js";
import { Engine, Physics, Position, Viewport, World, useKeyAxis, useKeyPressed, usePhysicsEngine, useProperty } from "@engine";
import { Balls, Device, Wall } from "../components";
import { PALETTE_ISLAND_JOY_16 as COLORS } from "../constants";
import { BallState } from "../state";

export const PhysicsDemo = () => {
  return (
    <div className="w-screen h-screen grid place-content-center bg-black">
      <Engine>
        <Physics>
          <PhysicsGame />
        </Physics>
      </Engine>
    </div>
  );
};

const PhysicsGame: React.FC = () => {
  const { engine, setGravity } = usePhysicsEngine();
  const [balls, setBalls] = useState<BallState[]>([]);
  const [hasWalls, setHasWalls] = useState(true);
  const angle = useProperty(0);

  /**
   * Add a new ball at the given location.
   */
  const addBall = useCallback((pos: Position) => {
    setBalls((balls) => [...balls, new BallState(
      pos,
      Math.random() * 25 + 15,
      COLORS[Math.floor(Math.random() * COLORS.length)],
    )]);
  }, []);

  /**
   * Remove the given ball from the scene.
   */
  const removeBall = useCallback((remove: BallState) => {
    setBalls((balls) => balls.filter((ball) => remove !== ball));
  }, []);

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
        <World>
          <Wall pos={[-250, 0]} size={[100, 1000]} />
          <Wall pos={[250, 0]} size={[100, 1000]} />

          {hasWalls && <Wall pos={[0, 450]} size={[600, 100]} />}
          {hasWalls && <Wall pos={[0, -450]} size={[600, 100]} />}

          <Balls balls={balls} onAdd={addBall} onRemove={removeBall} />
        </World>
      </Viewport>
    </Device>
  );
};
