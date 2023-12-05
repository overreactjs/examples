import { useContext, useState } from "react";
import { Engine, Keyboard, Physics, PhysicsContext, Position, Viewport, useElement, useKeyboard, useProperty, useRender, useUpdate } from "@engine";
import { Ball, Wall } from "./components";
import { COLORS } from "./constants";

export const PhysicsDemo = () => {
  return (
    <div className="w-screen h-screen grid place-content-center bg-black">
      <Keyboard>
        <Engine>
          <Physics>
            <Game />
          </Physics>
        </Engine>
      </Keyboard>
    </div>
  );
};



type Ball = {
  pos: Position;
  radius: number;
  color: string;
};

const Game: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const [balls, setBalls] = useState<Ball[]>([]);
  const [hasWalls, setHasWalls] = useState(true);
  const { isKeyPressed, hasKeyAxis } = useKeyboard();
  const angle = useProperty(0);
  const { setGravity } = useContext(PhysicsContext);

  useUpdate(() => {
    if (isKeyPressed('KeyA')) {
      const ball: Ball = {
        pos: [Math.random() * 200 - 100, -300],
        radius: Math.random() * 25 + 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };

      setBalls((balls) => [...balls, ball]);
    }

    if (isKeyPressed('KeyD')) {
      setHasWalls((hasBase) => !hasBase);
    }

    const diff = hasKeyAxis('KeyG', 'KeyH') * 2;
    if (diff !== 0) {
      angle.current += diff;
      setGravity(angle.current);
    }
    
  });

  useRender(() => {
    element.setBaseStyles({ angle });
  });
  
  return (
    <div ref={element.ref} className="w-[400px] h-[800px] bg-[#223344] relative rounded-3xl">
      <Viewport>
          {hasWalls && (
            <>
              <Wall pos={[0, 450]} size={[600, 100]} />
              <Wall pos={[0, -450]} size={[600, 100]} />
            </>
          )}

          <Wall pos={[-250, 0]} size={[100, 1000]} />
          <Wall pos={[250, 0]} size={[100, 1000]} />
          
          {balls.map(({ pos, radius, color }, index) => (
            <Ball key={index} pos={pos} radius={radius} color={color} />
          ))}
      </Viewport>
    </div>
  );
};
