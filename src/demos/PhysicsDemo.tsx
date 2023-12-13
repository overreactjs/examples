import { useCallback, useState } from "react";
import { Body } from "matter-js";
import { Device, Engine, Physics, Position, Viewport, World, useDeviceShaken, useKeyAxis, useKeyPressed, useMotion, usePhysicsEngine, useProperty } from "@engine";
import { Balls, Wall } from "../components";
import { PALETTE_ISLAND_JOY_16 as COLORS } from "../constants";
import { BallState } from "../state";

export const PhysicsDemo = () => {
  return (
    <Engine>
      <Physics>
        <PhysicsGame />
      </Physics>
    </Engine>
  );
};

const PhysicsGame: React.FC = () => {
  const { engine, setGravity } = usePhysicsEngine();
  const { activate } = useMotion();
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

  const shakeBalls = useCallback(() => {
    for (const body of engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        Body.setVelocity(body, {
          x: Math.random() * 140 - 70,
          y: Math.random() * 180 - 90,
        });
      }
    }
  }, []);

  // Press "S": Shake the device.
  useKeyPressed('KeyS', shakeBalls);
  useDeviceShaken(1000, shakeBalls);

  // Press: "D": Toggle the wall devices at the ends.
  useKeyPressed('KeyD', () => {
    setHasWalls((hasBase) => !hasBase);
  });

  // Press "G"/"H": Rotate the device.
  useKeyAxis('KeyG', 'KeyH', () => {
    setGravity(angle.current);
  });
  
  return (
    <Device angle={angle} allowShake allowTilt>
      <Viewport>
        <World>
          <Wall pos={[-250, 0]} size={[100, 1000]} />
          <Wall pos={[250, 0]} size={[100, 1000]} />

          {hasWalls && <Wall pos={[0, 450]} size={[600, 100]} />}
          {hasWalls && <Wall pos={[0, -450]} size={[600, 100]} />}

          <Balls balls={balls} onAdd={addBall} onRemove={removeBall} />
        </World>
      </Viewport>
      <button onClick={activate} className="absolute left-0 top-1/2 text-white">Activate</button>
    </Device>
  );
};
