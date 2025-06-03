import { useCallback, useEffect, useState } from "react";
import { Device, Engine, Physics, Position, useFixedUpdate, useMotion, usePhysicsEngine, usePointer, useUpdate, useWorld, Viewport, World } from "@overreact/engine";
import { Blob } from "./Blob";
import { BlobState } from "./BlobState";

export const Day3Demo = () => {
  return (
    <Engine>
      <Physics>
        <Device bg="#ffffff" showFPS>
          <div className="blobs2 w-full h-full bg-black">
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
  const motion = useMotion();
  const physics = usePhysicsEngine();
  const pointer = usePointer();
  const world = useWorld();
  
  const [blobs, setBlobs] = useState<BlobState[]>([]);

  /**
   * Add a new blob at the given location.
   * 
   * NOTE: This quickly becomes a performance bottleneck, because it triggers a re-render of this
   * component, in order to add more blob elements. Perhaps we could use particles, which are
   * manually hooked up to the physics engine?
   */
  const addBlob = useCallback((pos: Position) => {
    setBlobs((blobs) => [...blobs, new BlobState(pos, 15 + Math.random() * 10)]);
  }, []);

  /**
   * Give each of the blobs a random velocity, for a reasonable shake effect.
   */
  const shakeBlobs = useCallback(() => {
    for (const body of physics.engine.current?.world.bodies || []) {
      if (!body.isStatic) {
        physics.setVelocity(body, [Math.random() * 50 - 25, Math.random() * 50 - 25]);
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
  useEffect(() => {
    physics.setGravity([0, 0]);
  }, [physics]);

  /**
   * Create a new blob at the given position, unless there is already a blob there, in which
   * case it is removed.
   */
  useFixedUpdate(45, () => {
    if (pointer.isDown()) {
      const [x, y] = world.pointer.current;
      addBlob([x + Math.random() * 20 - 10, y + Math.random() * 20 - 10]);
    }
  });
  
  return (
    <>
      {blobs.map(({ id, pos, radius }) => (
        <Blob key={id} pos={pos} radius={radius} />
      ))}
    </>
  );
};