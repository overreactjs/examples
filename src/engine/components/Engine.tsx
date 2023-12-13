import { useMemo, useRef, useCallback, useEffect, useState } from "react";
import { useNode } from "../hooks";
import { EngineContext, NodeContext } from "../context";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { Touch } from "./Touch";
import { Motion } from "./Motion";

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
  const [debug, setDebug] = useState(false);
  const node = useNode();

  const onPause = useCallback(() => paused.current = !paused.current, []);
  const onDebug = useCallback(() => setDebug((debug) => !debug), []);

  // Handle one tick of the game loop.
  const tick = useCallback((t: number) => {
    requestAnimationFrame(tick);

    const delta = t - time.current;
    time.current = t;

    node.ticker(delta, t);

    if (!paused.current) {
      node.update(delta, t);
    }
    
    node.render();
  }, [node]);

  // Start the game loop.
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      setTimeout(onPause, 1000);
      tick(0);
    }
  }, [tick]);

  const engineContext = useMemo(() => ({ debug, onDebug, onPause }), [debug, onDebug, onPause]);

  return (
    <EngineContext.Provider value={engineContext}>
      <NodeContext.Provider value={node}>
        <Motion>
          <Keyboard>
            <Mouse>
              <Touch>
                {children}
              </Touch>
            </Mouse>
          </Keyboard>
        </Motion>
      </NodeContext.Provider>
    </EngineContext.Provider>
  );
};
