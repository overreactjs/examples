import { useRef } from "react";
import { PhysicsEvent, usePhysicsCollision, useUpdate } from "@overreact/engine";
import { useHaptics } from "@overreact/capacitor";

export const useCollisionHaptics = () => {
  const haptics = useHaptics();
  const giveFeedback = useRef(false);

  usePhysicsCollision((event: PhysicsEvent) => {
    const impact = event.pairs.reduce((prev: number, curr: { collision: { depth: number} }) => {
      return Math.max(prev, curr.collision.depth);
    }, 0);

    if (impact >= 5) {
      giveFeedback.current = true;
    }
  });

  useUpdate(() => {
    if (giveFeedback.current) {
      giveFeedback.current = false;
      haptics.impact('medium');
    }
  });
}