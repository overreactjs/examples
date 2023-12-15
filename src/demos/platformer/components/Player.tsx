import React, { useId } from "react";
import { BitmapSprite, Camera, CollisionBox, Node, SpriteSet, Velocity, useOffsetPosition, usePlatformMovement, usePosition, useProperty, useRender } from "@engine";
import { PLAYER_FALL, PLAYER_IDLE, PLAYER_JUMP, PLAYER_RUN } from "@assets";
import { P1_KEYBINDINGS, P2_KEYBINDINGS } from "../constants";
import { PlayerIndicator } from "./PlayerIndicator";
import { usePlatformGame } from "./PlatformGame";

const COLLIDER_OFFSET_Y = 9;
const KEY_BINDINGS = [P1_KEYBINDINGS, P2_KEYBINDINGS];

type PlayerProps = {
  index: 0 | 1;
  showLabels?: boolean;
}

export const Player: React.FC<PlayerProps> = ({ index, showLabels = false }) => {
  const game = usePlatformGame();
  const pos = usePosition(game.current.players[index].pos);
  const flip = useProperty(game.current.players[index].flip);
  const animation = useProperty(game.current.players[index].animation);
  const velocity = useProperty<Velocity>([0, 0]);
  const collider = useId();

  const colliderPos = useOffsetPosition(pos, [-25, -78]);
  const idleSpritePos = useOffsetPosition(pos, [-30, -99 + COLLIDER_OFFSET_Y]);
  const runSpritePos = useOffsetPosition(pos, [-33, -102 + COLLIDER_OFFSET_Y]);
  const jumpSpritePos = useOffsetPosition(pos, [-30, -108 + COLLIDER_OFFSET_Y]);
  const fallSpritePos = useOffsetPosition(pos, [-30, -108 + COLLIDER_OFFSET_Y]);
  const labelPos = useOffsetPosition(pos, [0, -128]);
  
  const movement = usePlatformMovement(collider, pos, velocity, {
    jumpStrength: 0.8,
    ...KEY_BINDINGS[index],
  });

  useRender(() => {
    flip.current = movement.direction.current === 'left';

    if (movement.isFalling.current) {
      animation.current = 'fall';
    } else if (movement.isJumping.current) {
      animation.current = 'jump';
    } else if (Math.abs(velocity.current[0]) >= 0.1) {
      animation.current = 'run';
    } else {
      animation.current = 'idle';
    }
  });

  return (
    <Node pos={pos}>
      <SpriteSet animation={animation}>
        <BitmapSprite name="idle" pos={idleSpritePos} size={[57, 102]} sprite={PLAYER_IDLE} flip={flip} />
        <BitmapSprite name="run" pos={runSpritePos} size={[63, 99]} sprite={PLAYER_RUN} flip={flip} />
        <BitmapSprite name="jump" pos={jumpSpritePos} size={[60, 108]} sprite={PLAYER_JUMP} flip={flip} repeat={false} />
        <BitmapSprite name="fall" pos={fallSpritePos} size={[60, 108]} sprite={PLAYER_FALL} flip={flip} repeat={false} />
      </SpriteSet>
      <CollisionBox pos={colliderPos} size={[50, 78]} id={collider} tags={['player']} />
      <Camera axis="xy" />
      {showLabels && <PlayerIndicator pos={labelPos} index={index} />}
    </Node>
  );
}

