import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Prop, SpriteSet, useOffsetPosition, useProperty, useTaggedCollision } from "@engine";
import { GemState } from "../state";
import { usePlatformGame } from "./PlatformGame";

import { GEM } from "../assets";

type GemProps = {
  gem: Prop<GemState>;
}

export const Gem: React.FC<GemProps> = (props) => {
  const game = usePlatformGame();
  const gem = useProperty(props.gem);
  const spritePos = useOffsetPosition(gem.current.pos, [-24, -24]);
  const colliderPos = useOffsetPosition(gem.current.pos, [-18, -18]);
  const collider = useId();

  useTaggedCollision(collider, 'player', () => {
    game.current.collectGem(gem.current);
  });

  return (
    <Node>
      <SpriteSet animation="default">
        <BitmapSprite name="default" pos={spritePos} size={[48, 48]} image={GEM} count={8} rate={10} />
      </SpriteSet>
      <CollisionBox id={collider} pos={colliderPos} size={[36, 36]} tags={['gem']} />
    </Node>
  );
};
