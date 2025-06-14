import { Prop, Position, usePosition, useProperty, Size, Circle, useDynamicProperty, useCachedDynamicProperty, Property, useFixedUpdate, useCirclePhysics, usePhysicsEngine } from "@overreact/engine";

type BlobProps = {
  pos: Prop<Position>;
  radius: Prop<number>;
};

export const Blob: React.FC<BlobProps> = (props) => {
  const pos = usePosition(props.pos);
  const radius = useProperty(props.radius);
  const physicsRadius = useCachedDynamicProperty(radius, (radius) => radius / 1.5);

  const circlePos = useDynamicProperty(pos, (pos): Position => [
    pos[0] - radius.current,
    pos[1] - radius.current,
  ]);

  const circleSize = useCachedDynamicProperty(radius, (radius): Size => [radius * 2, radius * 2]);

  useBlobPhysics(pos, physicsRadius);

  return <Circle pos={circlePos} size={circleSize} color="white" />;
};

/**
 * 
 */
const useBlobPhysics = (
  pos: Property<Position>,
  radius: Property<number>,
) => {
  const physics = usePhysicsEngine();
  const body = useCirclePhysics(pos, radius, { friction: 0.75, restitution: 0.5, slop: 0.05 });
  const ttl = useProperty(Math.random() * 1000 + 1000);

  // Constantly apply a force towards the world origin (center of the screen).
  useFixedUpdate(10, () => {
    const { x, y } = body.current.position;
    physics.applyForce(body.current, [x, y], [-x / 40000, -y / 40000]);
  });

  // Every so often, randomly apply a force to the blob, making them move around a little.
  useFixedUpdate(60, (delta) => {
    ttl.current -= delta;

    if (ttl.current <= 0) {
      if (Math.random() < 0.025) {
        ttl.current = Math.random() * 1000 + 1000;

        physics.setVelocity(body.current, [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
        ]);
      }
    }
  });
};
