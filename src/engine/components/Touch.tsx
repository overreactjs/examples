import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { TouchContext } from "../context";
import { useProperty } from "../hooks";
import { Position } from "../types";

type TouchProps = {
  children: React.ReactNode;
}

export const Touch: React.FC<TouchProps> = ({ children }) => {
  const down = useRef<Set<number>>(new Set());
  const pressed = useRef<Set<number>>(new Set());
  const pos = useProperty<Position>([0, 0]);

  /**
   * Returns true if the given mouse button is down.
   */
  const isDown = useCallback(() => {
    return down.current.has(0);
  }, []);

  /**
   * Returns true if the given mouse button was *just* released.
   */
  const isPressed = useCallback(() => {
    return pressed.current.has(0);
  }, []);

  /**
   * Keep track of which buttons are pressed down.
   */
  const handleTouchStart = useCallback((event: TouchEvent) => {
    pos.current[0] = event.touches[0].clientX;
    pos.current[1] = event.touches[0].clientY;
    down.current.add(0);
  }, [pos]);

  /**
   * Keep track of which buttons have just been released.
   */
  const handleTouchEnd = useCallback(() => {
    down.current.delete(0);
    pressed.current.add(0);
    requestAnimationFrame(() => {
      pressed.current.delete(0);
    });
  }, []);

  /**
   * Track the current screen position of the mouse.
   */
  const handleTouchMove = useCallback((event: TouchEvent) => {
    pos.current[0] = event.touches[0].clientX;
    pos.current[1] = event.touches[0].clientY;
  }, [pos]);

  /**
   * Attach key event handlers to the window, to capture all events.
   */
  useEffect(() => {
    addEventListener('touchstart', handleTouchStart);
    addEventListener('touchend', handleTouchEnd);
    addEventListener('touchmove', handleTouchMove);

    return () => {
      removeEventListener('touchstart', handleTouchStart);
      removeEventListener('touchend', handleTouchEnd);
      removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const context = useMemo(
    () => ({ pos, isDown, isPressed }),
    [pos, isDown, isPressed],
  );

  return (
    <TouchContext.Provider value={context}>
      {children}
    </TouchContext.Provider>
  );
};
