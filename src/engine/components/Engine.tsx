import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { useKeyboard, useNode } from "../hooks";
import { NodeContext } from "../context";

/**
 * Engine
 * ------
 * 
 * Provides a game loop, ensuring updates are made at a constant frame rate.
 */

type EngineProps = {
  children: React.ReactNode;
}

export const Engine: React.FC<EngineProps> = ({ children }) => {
  const started = useRef(false);
  const paused = useRef(true);
  const time = useRef<number>(0);
  const { update, render, ...node } = useNode();
  const { isKeyPressed } = useKeyboard();

  const [debug, setDebug] = useState(false);
  const toggleDebug = useCallback(() => setDebug((debug) => !debug), []);

  // Handle one tick of the game loop.
  const tick = useCallback((t: number) => {
    requestAnimationFrame(tick);

    const delta = t - time.current;
    time.current = t;

    // console.log(delta.toFixed(3));

    if (isKeyPressed('KeyP')) {
      paused.current = !paused.current;
    }

    if (isKeyPressed('KeyO')) {
      toggleDebug();
    }

    if (!paused.current && delta > 0) {
      update(delta);
    }
    
    render();

  }, [isKeyPressed, render, toggleDebug, update]);

  // Start the game loop.
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      tick(0);
    }
  }, [tick]);

  const context = useMemo(() => ({ ...node, debug, toggleDebug }), [node, debug, toggleDebug]);

  return (
    <NodeContext.Provider value={context}>
      <div className="w-screen h-screen">{children}</div>
    </NodeContext.Provider>
  );
};
