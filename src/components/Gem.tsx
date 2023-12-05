import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Prop, SpriteSet, useLogMount, useOffsetPosition, useProperty, useTaggedCollision } from "@engine";
import { GemState } from "../state";
import { useGame } from "./Game";

import { GEM } from "../assets";

type GemProps = {
  gem: Prop<GemState>;
}

export const Gem: React.FC<GemProps> = (props) => {
  const game = useGame();
  const gem = useProperty(props.gem);
  const gemPos = useOffsetPosition(gem.current.pos, [-24, -24]);
  const colliderPos = useOffsetPosition(gem.current.pos, [-18, -18]);
  const collider = useId();

  useLogMount('Gem');

  useTaggedCollision(collider, 'player', () => {
    game.current.collectGem(gem.current);
  });

  return (
    <Node pos={gem.current.pos}>
      <SpriteSet animation="default">
        <BitmapSprite name="default" pos={gemPos} size={[48, 48]} image={GEM} count={8} rate={10} />
      </SpriteSet>
      <CollisionBox id={collider} pos={colliderPos} size={[36, 36]} tags={['gem']} />
    </Node>
  );
};
