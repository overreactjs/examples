import { useId } from "react";
import { BitmapSprite, CollisionBox, Node, useOffsetPosition, useTaggedCollision } from "@overreact/engine";
import { GEM } from "@assets";
import { GemState } from "../state";
import { usePlatformGame } from "./PlatformGame";

type GemProps = {
  gem: GemState;
}

export const Gem: React.FC<GemProps> = ({ gem }) => {
  const game = usePlatformGame();
  const spritePos = useOffsetPosition(gem.pos, [-24, -24]);
  const colliderPos = useOffsetPosition(gem.pos, [-18, -18]);
  const collider = useId();

  useTaggedCollision(collider, 'player', () => {
    game.current.collectGem(gem);
  });

  return (
    <Node>
      <BitmapSprite pos={spritePos} size={[48, 48]} sprite={GEM} />
      <CollisionBox id={collider} pos={colliderPos} size={[36, 36]} tags={['gem']} />
    </Node>
  );
};
