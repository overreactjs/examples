import React, { useId } from "react";
import { Box, Camera, CollisionBox, Node, Velocity, use8DirectionMovement, useElement, useOffsetPosition, usePosition, useProperty, useRender } from "@overreact/engine";

export const Player: React.FC = () => {
  const element = useElement();

  const pos = usePosition([0, 0]);
  // const flip = useProperty(false);
  // const animation = useProperty('idle');
  const velocity = useProperty<Velocity>([0, 0]);
  const collider = useId();

  const colliderPos = useOffsetPosition(pos, [-32, -96]);
  
  const movement = use8DirectionMovement(collider, pos, velocity, {
    speed: 0.25,
    acceleration: 0.2,
  });

  useRender(() => {
    // flip.current = movement.direction.current === 'left';

    // if (movement.isFalling.current) {
    //   animation.current = 'fall';
    // } else if (movement.isJumping.current) {
    //   animation.current = 'jump';
    // } else if (Math.abs(velocity.current[0]) >= 0.1) {
    //   animation.current = 'run';
    // } else {
    //   animation.current = 'idle';
    // }

    element.setText(movement.direction.current);
  });

  return (
    <Node pos={pos}>
      <CollisionBox pos={colliderPos} size={[64, 96]} id={collider} tags={['player']} />
      <Box pos={colliderPos} size={[64, 96]} color="yellow">
        <div ref={element.ref} />
      </Box>
      <Camera axis="xy" />
    </Node>
  );
}

