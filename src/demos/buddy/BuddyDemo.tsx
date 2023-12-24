import { BitmapSprite, Device, Engine, Viewport, World } from "@overreact/engine";
import { BUDDY_IDLE } from "@assets";

export const BuddyDemo = () => {
  return (
    <Engine>
      <Device>
        <Viewport>
          <World>
            <BitmapSprite sprite={BUDDY_IDLE} pos={[-85, -112]} size={[170, 225]} />
          </World>
        </Viewport>
      </Device>
    </Engine>
  );
};
