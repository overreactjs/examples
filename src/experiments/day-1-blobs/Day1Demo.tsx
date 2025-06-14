import { useCallback, useState } from "react";
import { Device, Engine, Physics, Position, Size, useDevice, useFixedUpdate, useMotion, useOrientation, usePhysicsEngine, usePointer, usePosition, useProperty, usePropertyListen, useUpdate, useWorld, Viewport, World } from "@overreact/engine";
import { Wall } from "./Wall";
import { Blob } from "./Blob";
import { BlobState } from "./BlobState";

const COLORS = [
  '#6df7c1',
  '#11adc1',
  '#606c81',
  '#1e8875',
  '#5bb361',
  '#a1e55a',
  '#f7e476',
  '#f99252',
  '#cb4d68',
  '#6a3771',
  '#c92464',
  '#f48cb6',
  '#f7b69e',
  '#9b9c82',
];

export const Day1Demo = () => {
  return (
    <Engine>
      <Physics>
        <Device bg="#000000" showFPS>
          <div className="day-1-blobs w-full h-full bg-black">
            <Viewport>
              <World>
                <BlobsGame />
              </World>
            </Viewport>
          </div>
         </Device>
      </Physics>
    </Engine>
  );
};

const BlobsGame: React.FC = () => {
  const device = useDevice();
  const motion = useMotion();
  const orientation = useOrientation();
  const physics = usePhysicsEngine();
  const pointer = usePointer();
  const world = useWorld();
  
  const [blobs, setBlobs] = useState<BlobState[]>([]);

  const left = usePosition([-200, 0]);
  const right = usePosition([200, 0]);
  const top = usePosition([0, -400]);
  const bottom = usePosition([0, 400]);
  const width = useProperty<Size>([3000, 100]);
  const height = useProperty<Size>([100, 2000]);

  /**
   * Add a new blob at the given location.
   * 
   * NOTE: This quickly becomes a performance bottleneck, because it triggers a re-render of this
   * component, in order to add more blob elements. Perhaps we could use particles, which are
   * manually hooked up to the physics engine?
   */
  const addBlob = useCallback((pos: Position) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBlobs((blobs) => [...blobs, new BlobState(pos, 20, color)]);
  }, []);

  /**
   * Give each of the blobs a random velocity, for a reasonable shake effect.
   */
  const shakeBlobs = useCallback(() => {
    for (const body of physics.engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        physics.setVelocity(body, [Math.random() * 140 - 70, Math.random() * 180 - 90]);
      }
    }
  }, [physics]);
  
  /**
   * Scatter the blobs when the device is shaken.
   */
  useUpdate(() => {
    if (motion.isShaking(1000)) {
      shakeBlobs();
    }
  });

  /**
   * Set the gravity to the direction the device is facing.
   */
  useUpdate(() => {
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
  usePropertyListen(device.size, ([w, h]) => {
    left.current[0] = -50 - w / 2;
    right.current[0] = 50 + w / 2;
    top.current[1] = -50 - h / 2;
    bottom.current[1] = 50 + h / 2;
    width.current[0] = w;
    height.current[1] = h;
  });

  /**
   * Create a new blob at the given position, unless there is already a blob there, in which
   * case it is removed.
   */
  useFixedUpdate(45, () => {
    if (pointer.isDown()) {
      const [x, y] = world.pointer.current;
      addBlob([x + Math.random() * 10 - 5, y + Math.random() * 10 - 5]);
    }
  });
  
  return (
    <>
      <Wall pos={left} size={height} />
      <Wall pos={right} size={height} />
      <Wall pos={top} size={width} />
      <Wall pos={bottom} size={width} />

      {blobs.map(({ id, pos, radius, color }) => (
        <Blob key={id} pos={pos} radius={radius} color={color} />
      ))}
    </>
  );
};