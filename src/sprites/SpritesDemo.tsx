import { ChangeEvent, useCallback } from "react";
import { BitmapSprite, Device, Engine, SpriteSet, Viewport, World, useProperty } from "@overreact/engine";
import { IDLE, RUN, WALK } from "./assets";

const SELECT_INPUT = 'absolute top-24 left-6 right-6 px-5 py-4 box-border bg-slate-50 text-slate-900 font-[Quicksand] font-bold text-2xl rounded-lg shadow-xl';

export const SpritesDemo = () => {
  const animation = useProperty('idle');

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    animation.current = event.target.value;
  }, [animation]);

  return (
    <Engine>
      <Device mode="mobile">
        <div className="w-full h-full bg-slate-800">
          <Viewport>
            <World>
              <SpriteSet animation={animation}>
                <BitmapSprite name="idle" sprite={IDLE} pos={[-80, -120]} size={[160, 240]} />
                <BitmapSprite name="run" sprite={RUN} pos={[-80, -120]} size={[160, 240]} />
                <BitmapSprite name="walk" sprite={WALK} pos={[-80, -120]} size={[160, 240]} />
              </SpriteSet>
            </World>
          </Viewport>
          <select onChange={handleChange} className={SELECT_INPUT} style={{ appearance: 'none' }}>
            <option value="idle">Idle</option>
            <option value="walk">Walk</option>
            <option value="run">Run</option>
          </select>
        </div>
      </Device>
    </Engine>
  );
};
