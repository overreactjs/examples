import React, { useCallback, useMemo, useRef } from "react";
import { System, Body } from "detect-collisions";
import { Node } from "./Node";
import { CollisionEventFunction, CollisionUpdateFunction } from "../types";
import { useUpdate } from "../hooks";
import { WorldContext } from "../context";

/**
 * World
 * -------
 * 
 * A collection of objects that can move independently and collide with one another.
 */

type WorldProps = {
  children: React.ReactNode;
}

export const World: React.FC<WorldProps> = ({ children }) => {
  const system = useRef<System>(new System());
  const bodies = useRef<Map<string, Body>>(new Map());
  const bodyTags = useRef<Map<Body, string[]>>(new Map());
  const updaters = useRef<Map<Body, CollisionUpdateFunction>>(new Map());
  const handlers = useRef<Map<Body, Set<CollisionEventFunction>>>(new Map());

  const registerCollider = useCallback((id: string, tags: string[], body: Body, fn: CollisionUpdateFunction) => {
    if (!bodies.current.has(id)) {
      system.current.insert(body);
      bodies.current.set(id, body);
      bodyTags.current.set(body, tags);
      updaters.current.set(body, fn);
    }

    return () => {
      if (bodies.current.has(id)) {
        const body = bodies.current.get(id);
        if (body) {
          system.current.remove(body)
          updaters.current.delete(body);
          handlers.current.delete(body);
          bodies.current.delete(id);
        }
      }
    }
  }, []);

  const registerHandler = useCallback((id: string, fn: CollisionEventFunction) => {
    const body = bodies.current.get(id);
    if (body) {
      if (!handlers.current.has(body)) {
        handlers.current.set(body, new Set());
      }
      handlers.current.get(body)?.add(fn);
    }

    return () => {
      if (body) {
        handlers.current.get(body)?.delete(fn);
      }
    };
  }, []);

  const context = useMemo(
    () => ({ registerCollider, registerHandler }),
    [registerCollider, registerHandler],
  );

  const overlaps = useRef(new OverlappingSet());

  useUpdate(() => {
    // Run all body update callbacks.
    for (const [body, update] of updaters.current) {
      update(body);
    }

    const newOverlaps = new OverlappingSet();

    // Check for collisions.
    system.current.checkAll((collision) => {
      for (const handler of handlers.current.get(collision.a) || []) {
        const tags = bodyTags.current.get(collision.b) || [];
        const firstTime = !overlaps.current.has(collision.a, collision.b);
        
        handler({ collision, tags, firstTime });
        newOverlaps.add(collision.a, collision.b);
      }
    });

    overlaps.current = newOverlaps;
  });

  return (
    <WorldContext.Provider value={context}>
      <Node>
        <div>{children}</div>
      </Node>
    </WorldContext.Provider>
  );
}

class OverlappingSet {
  overlaps: Map<Body, Set<Body>> = new Map();

  add(a: Body, b: Body) {
    if (!this.overlaps.has(a)) {
      this.overlaps.set(a, new Set());
    }
    this.overlaps.get(a)?.add(b);
  }

  has(a: Body, b: Body) {
    return !!this.overlaps.get(a)?.has(b);
  }
}