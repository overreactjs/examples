import { Engine, Keyboard, Physics, Viewport, World } from "@engine";

export const EmptyDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Keyboard>
        <Engine>
          <Viewport>
            <Physics>
              <World>
              </World>
            </Physics>
          </Viewport>
        </Engine>
      </Keyboard>
    </div>
  );
};
