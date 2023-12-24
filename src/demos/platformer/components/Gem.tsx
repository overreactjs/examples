import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, Prop, useOffsetPosition, useProperty, useTaggedCollision } from "@overreact/engine";
import { GEM } from "@assets";
import { GemState } from "../state";
import { usePlatformGame } from "./PlatformGame";

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
      <BitmapSprite pos={spritePos} size={[48, 48]} sprite={GEM} />
      <CollisionBox id={collider} pos={colliderPos} size={[36, 36]} tags={['gem']} />
    </Node>
  );
};
