import React, { useCallback, useEffect, useMemo } from "react";
import { OrientationContext } from "../context";
import { useKeyAxis, useProperty } from "../hooks";

type OrientationProps = {
  children: React.ReactNode;
}

export const Orientation: React.FC<OrientationProps> = ({ children }) => {
  const alpha = useProperty(0);
  const beta = useProperty(45);
  const gamma = useProperty(0);
  const angle = useProperty(0);

  const activate = useCallback(() => {
    (DeviceOrientationEvent as any).requestPermission();
  }, []);

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    alpha.current = event.alpha || 0;
    beta.current = event.beta || 0;
    gamma.current = event.gamma || 0;
  }, []);

  /**
   * Attach key event handlers to the window, to capture all events.
   */
  useEffect(() => {
    addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  /**
   * In development, when the app is running in a browser, simulate tilting the device using the
   * G and H keys.
   */
  useKeyAxis('KeyG', 'KeyH', (value) => {
    if (value !== 0) {
      angle.current += value;
      gamma.current = Math.sin(angle.current * Math.PI / 90) * 45;
      beta.current = Math.cos(angle.current * Math.PI / 90) * 45;
    }
  });

  const context = useMemo(
    () => ({ alpha, beta, gamma, activate }),
    [],
  );

  return (
    <OrientationContext.Provider value={context}>
      {children}
    </OrientationContext.Provider>
  );
};