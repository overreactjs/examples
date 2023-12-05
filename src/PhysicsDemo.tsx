import { Engine, Keyboard, Physics, Position, Viewport, useKeyboard, useUpdate } from "@engine";
import { PhysicsCircle } from "./engine/components/PhysicsCircle";
import { PhysicsBox } from "./engine/components/PhysicsBox";
import { useState } from "react";

export const PhysicsDemo = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Keyboard>
        <Engine>
          <Game />
        </Engine>
      </Keyboard>
    </div>
  );
};

type Ball = {
  pos: Position;
  radius: number;
};

const Game: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const { isKeyPressed } = useKeyboard();

  useUpdate(() => {
    if (isKeyPressed('KeyA')) {
      const ball: Ball = {
        pos: [Math.random() * 50 - 25, -300],
        radius: Math.random() * 10 + 20,
      };

      setBalls((balls) => [...balls, ball]);
    }
  });
  
  return (
    <Viewport>
      <Physics>
        <PhysicsBox pos={[0, 300]} size={[620, 20]} static />
        <PhysicsBox pos={[-300, 0]} size={[20, 620]} static />
        <PhysicsBox pos={[300, 0]} size={[20, 620]} static />
        {balls.map(({ pos, radius }, index) => (
          <PhysicsCircle key={index} pos={pos} radius={radius} />
        ))}
      </Physics>
    </Viewport>
  );
}
