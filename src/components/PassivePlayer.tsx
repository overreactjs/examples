import React from "react";
import { PLAYER_FALL, PLAYER_IDLE, PLAYER_JUMP, PLAYER_RUN } from "../assets";
import { BitmapSprite, Node, SpriteSet, useOffsetPosition, usePosition, useProperty } from "@engine";
import { useGame } from "./Game";
import { PlayerIndicator } from "./PlayerIndicator";

const COLLIDER_OFFSET_Y = 9;

/**
 * Player
 * ------
 * 
 * ...
 */

type PlayerProps = {
  index: 0 | 1;
}

export const PassivePlayer: React.FC<PlayerProps> = ({ index }) => {
  const game = useGame();
  const pos = usePosition(game.current.players[index].pos);
  const flip = useProperty(game.current.players[index].flip);
  const animation = useProperty(game.current.players[index].animation);

  const idleSpritePos = useOffsetPosition(pos, [-30, -99 + COLLIDER_OFFSET_Y]);
  const runSpritePos = useOffsetPosition(pos, [-33, -102 + COLLIDER_OFFSET_Y]);
  const jumpSpritePos = useOffsetPosition(pos, [-30, -108 + COLLIDER_OFFSET_Y]);
  const fallSpritePos = useOffsetPosition(pos, [-30, -108 + COLLIDER_OFFSET_Y]);
  const labelPos = useOffsetPosition(pos, [0, -128]);

  return (
    <Node pos={pos}>
      <SpriteSet animation={animation}>
        <BitmapSprite name="idle" pos={idleSpritePos} size={[57, 102]} image={PLAYER_IDLE} count={12} rate={10} flip={flip} />
        <BitmapSprite name="run" pos={runSpritePos} size={[63, 99]} image={PLAYER_RUN} count={8} rate={10} flip={flip} />
        <BitmapSprite name="jump" pos={jumpSpritePos} size={[60, 108]} image={PLAYER_JUMP} count={1} rate={10} flip={flip} repeat={false} />
        <BitmapSprite name="fall" pos={fallSpritePos} size={[60, 108]} image={PLAYER_FALL} count={2} rate={10} flip={flip} repeat={false} />
      </SpriteSet>
     <PlayerIndicator pos={labelPos} index={index} />
    </Node>
  );
}

