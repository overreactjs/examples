import { useState, useCallback, useEffect } from "react";
import { Position, Viewport, World, useDevice, useMotion, useOrientation, usePhysicsEngine, usePosition, useUpdate } from "@overreact/engine";
import { PALETTE_ISLAND_JOY_16 as COLORS } from './constants';
import { MarbleState } from "./MarbleState";
import { Marbles } from "./Marbles";
import { Wall } from "./Wall";

export const MarbleJarGame: React.FC = () => {
  const device = useDevice();
  const motion = useMotion();
  const orientation = useOrientation();
  const physics = usePhysicsEngine();

  const [marbles, setMarbles] = useState<MarbleState[]>([]);

  const left = usePosition([-200, 0]);
  const right = usePosition([200, 0]);
  const top = usePosition([0, -400]);
  const bottom = usePosition([0, 400]);
  
  /**
   * Add a new marble at the given location.
   */
  const addMarble = useCallback((pos: Position) => {
    setMarbles((marbles) => [...marbles, new MarbleState(
      pos,
      Math.random() * 25 + 15,
      COLORS[Math.floor(Math.random() * COLORS.length)],
    )]);
  }, []);

  /**
   * Remove the given marble from the scene.
   */
  const removeMarble = useCallback((remove: MarbleState) => {
    setMarbles((marbles) => marbles.filter((marble) => remove !== marble));
  }, []);

  /**
   * Give each of the marbles a random velocity, for a reasonable shake effect.
   */
  const shakeMarbles = useCallback(() => {
    for (const body of physics.engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        physics.setVelocity(body, [Math.random() * 140 - 70, Math.random() * 180 - 90]);
      }
    }
  }, [physics]);
  
  useUpdate(() => {
    // Shake the marbles when the device is shaken.
    if (motion.isShaking(500)) {
      shakeMarbles();
    }

    // Set the gravity to the direction the device is facing.
    if (orientation.gamma.current === 0 && orientation.beta.current === 0) {
      physics.setGravity([0, 1]);
    } else {
      physics.setGravity([
        Math.min(4, orientation.gamma.current / 16),
        Math.min(4, orientation.beta.current / 16),
      ]);
    }
  });

  /**
   * Position the outer walls to align with the device size.
   */
  useEffect(() => {
    return device.size.listen(([w, h]) => {
      left.current[0] = -50 - w / 2;
      right.current[0] = 50 + w / 2;
      top.current[1] = -50 - h / 2;
      bottom.current[1] = 50 + h / 2;
    });
  }, [bottom, device.size, left, right, top]);
  
  return (
    <Viewport>
      <World>
        <Wall pos={left} size={[100, 1000]} />
        <Wall pos={right} size={[100, 1000]} />
        <Wall pos={top} size={[600, 100]} />
        <Wall pos={bottom} size={[600, 100]} />

        <Marbles marbles={marbles} onAdd={addMarble} onRemove={removeMarble} />
      </World>
    </Viewport>
  );
};
