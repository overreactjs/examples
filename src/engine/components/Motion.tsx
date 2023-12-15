import React, { useCallback, useEffect, useMemo } from "react";
import { MotionContext } from "../context";
import { useKeyPressed, useProperty } from "../hooks";

type MotionProps = {
  children: React.ReactNode;
}

export const Motion: React.FC<MotionProps> = ({ children }) => {
  const acceleration = useProperty<[number, number, number]>([0, 0, 0]);
  
  const activate = useCallback(() => {
    (DeviceMotionEvent as any).requestPermission();
  }, []);

  const isShaking = useCallback(() => {
    const [x, y, z] = acceleration.current;
    return Math.abs(x) + Math.abs(y) + Math.abs(z) > 25;
  }, []);

  const handleDeviceMotion = useCallback((event: DeviceMotionEvent) => {
    const { x, y, z } = event.acceleration || {};
    acceleration.current = [x || 0, y || 0, z || 0];
  }, []);

  /**
   * Attach key event handlers to the window, to capture all events.
   */
  useEffect(() => {
    addEventListener('devicemotion', handleDeviceMotion);

    return () => {
      removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  useKeyPressed('KeyS', () => {
    acceleration.current = [50, 0, 0];
    setTimeout(() => acceleration.current = [0, 0, 0], 100);
  });

  const context = useMemo(
    () => ({ acceleration, activate, isShaking }),
    [],
  );

  return (
    <MotionContext.Provider value={context}>
      {children}
    </MotionContext.Provider>
  );
};
