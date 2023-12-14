import { useCallback, useState } from "react";
import { Body } from "matter-js";
import { Device, Engine, Physics, Position, Prop, Viewport, World, useDevice, useDeviceShaken, useKeyPressed, useOrientation, usePhysicsEngine, usePosition, useProperty, useUpdate } from "@engine";
import { Balls, Close, Wall } from "../components";
import { PALETTE_ISLAND_JOY_16 as COLORS } from "../constants";
import { BallState } from "../state";

export const PhysicsDemo = () => {
  const angle = useProperty(0);

  return (
    <Engine>
      <Physics>
        <Device angle={angle} allowShake allowTilt bg="#223344">
          <PhysicsGame angle={angle} />
          <Close />
         </Device>
      </Physics>
    </Engine>
  );
};

type PhysicsGameProps = {
  angle: Prop<number>;
};

const PhysicsGame: React.FC<PhysicsGameProps> = () => {
  const device = useDevice();
  const { engine, setGravity } = usePhysicsEngine();
  const [balls, setBalls] = useState<BallState[]>([]);
  const [hasWalls, setHasWalls] = useState(true);
  
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
  // useKeyAxis('KeyG', 'KeyH', () => {
  //   setGravity(angle.current);
  // });

  const orientation = useOrientation();
  useUpdate(() => {
    const x = orientation.gamma.current;
    const y = orientation.beta.current;
    setGravity(Math.min(4, x / 10), Math.min(4, y / 10));
  });

  const left = usePosition([-200, 0]);
  const right = usePosition([200, 0]);
  const top = usePosition([0, -400]);
  const bottom = usePosition([0, 400]);

  useUpdate(() => {
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
