import { useCallback, useState } from "react";
import { Body } from "matter-js";
import { Device, Engine, Physics, Position, Viewport, World, useDevice, useKeyPressed, useMotion, useOrientation, usePhysicsEngine, usePosition, useUpdate } from "@engine";
import { Balls, Close, Debug, Wall } from "../components";
import { PALETTE_ISLAND_JOY_16 as COLORS } from "../constants";
import { BallState } from "../state";

export const PhysicsDemo = () => {
  return (
    <Engine>
      <Physics>
        <Device allowShake allowTilt bg="#223344">
          <PhysicsGame />
          <Close />
          <Debug />
         </Device>
      </Physics>
    </Engine>
  );
};

const PhysicsGame: React.FC = () => {
  const device = useDevice();
  const motion = useMotion();
  const orientation = useOrientation();
  const physics = usePhysicsEngine();

  const [balls, setBalls] = useState<BallState[]>([]);
  const [hasWalls, setHasWalls] = useState(true);

  const left = usePosition([-200, 0]);
  const right = usePosition([200, 0]);
  const top = usePosition([0, -400]);
  const bottom = usePosition([0, 400]);
  
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

  /**
   * Give each of the balls a random velocity, for a reasonable shake effect.
   */
  const shakeBalls = useCallback(() => {
    for (const body of physics.engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        Body.setVelocity(body, {
          x: Math.random() * 140 - 70,
          y: Math.random() * 180 - 90,
        });
      }
    }
  }, []);

  // Press: "D": Toggle the wall devices at the ends.
  useKeyPressed('KeyD', () => {
    setHasWalls((hasBase) => !hasBase);
  });
  
  useUpdate(() => {
    // Shake the balls when the device is shaken.
    if (motion.isShaking(250)) {
      shakeBalls();
    }

    // Set the gravity to the direction the device is facing.
    physics.setGravity(
      Math.min(4, orientation.gamma.current / 16),
      Math.min(4, orientation.beta.current / 16),
    );

    // Position the outer walls to align with the device size.
    const [w, h] = device.size.current;
    left.current[0] = -50 - w / 2;
    right.current[0] = 50 + w / 2;
    top.current[1] = -50 - h / 2;
    bottom.current[1] = 50 + h / 2;
  });
  
  return (
    <Viewport>
      <World>
        <Wall pos={left} size={[100, 1000]} />
        <Wall pos={right} size={[100, 1000]} />

        {hasWalls && <Wall pos={top} size={[600, 100]} />}
        {hasWalls && <Wall pos={bottom} size={[600, 100]} />}

        <Balls balls={balls} onAdd={addBall} onRemove={removeBall} />
      </World>
    </Viewport>
  );
};
