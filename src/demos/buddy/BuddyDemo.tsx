import { BitmapSprite, Device, Engine, SpriteSet, Viewport, World, useProperty } from "@overreact/engine";
import { BUDDY_IDLE } from "@assets";

export const BuddyDemo = () => {
  const animation = useProperty('idle');

  return (
    <Engine>
      <Device mode="mobile">
        <Viewport>
          <World>
            <SpriteSet animation={animation}>
              <BitmapSprite name="idle" sprite={BUDDY_IDLE} pos={[-85, -112]} size={[170, 225]} />
            </SpriteSet>
          </World>
        </Viewport>
      </Device>
    </Engine>
  );
};
