import { useRef } from "react";
import { PhysicsEvent, useHaptics, usePhysicsCollision, useUpdate } from "@engine";

export const useCollisionHaptics = () => {
  const haptics = useHaptics();
  const giveFeedback = useRef(false);

  usePhysicsCollision((event: PhysicsEvent) => {
    const impact = event.pairs.reduce((prev, curr) => {
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