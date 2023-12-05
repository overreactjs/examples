import React, { useCallback, useMemo, useRef } from "react";
import { Engine, Composite } from "matter-js";
import { PhysicsContext } from "../context";
import { useUpdate } from "../hooks";
import { PhysicsUpdateFunction } from "../types";

type PhysicsProps = {
  children: React.ReactNode;
}

/**
 * Physics
 * -------
 * 
 * Setup the physics engine (using matter-js), and provide functions for registering new physical
 * bodies via context.
 */
export const Physics: React.FC<PhysicsProps> = ({ children }) => {
  const engine = useRef(Engine.create());
  const updaters = useRef<Map<Matter.Body, PhysicsUpdateFunction>>(new Map());
  
  /**
   * Register function is used to add (and remove) physics bodies to (and from) the system. Each
   * body is paired with an update function, which is called each time the body moves, allowing
   * its properties (such as position and rotation) to be synced with other elements.
   */
  const register = useCallback((body: Matter.Body, fn: PhysicsUpdateFunction) => {
    Composite.add(engine.current.world, body);
    updaters.current.set(body, fn);

    return () => {
      Composite.remove(engine.current.world, body)
      updaters.current.delete(body);
    };
  }, []);

  /**
   * Each frame, play the physics system forwards, then call all of the update functions.
   */
  useUpdate((delta) => {
    Engine.update(engine.current, delta);
    
    for (const [body, update] of updaters.current) {
      update(body);
    }
  });

  const context = useMemo(() => ({ register }), [register]);

  return (
    <PhysicsContext.Provider value={context}>
      {children}
    </PhysicsContext.Provider>
  );
};
