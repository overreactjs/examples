import { CollisionBox, Engine, Viewport, World, useMouse, useTicker, useWorld } from "@engine";

// import TestSprite from '../assets/test.svg?react';
import { useId } from "react";

export const EmptyDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Engine>
        <Viewport>
          <World>
            <EmptyGame />
          </World>
        </Viewport>
      </Engine>
    </div>
  );
};

const EmptyGame: React.FC = () => {
  const { isMousePressed, ...mouse } = useMouse();
  const { isInside } = useWorld();
  const collider = useId();

  useTicker(() => {
    if (isMousePressed(0) && isInside(collider, mouse.world)) {
      console.log('Hit!');
    }
  });

  return (
    <>
      {/* <VectorSprite name="test" pos={[-50, -50]} size={[100, 100]} sprite={TestSprite} /> */}
      <CollisionBox id={collider} pos={[-50, -50]} size={[100, 100]} />
    </>
  );
};
