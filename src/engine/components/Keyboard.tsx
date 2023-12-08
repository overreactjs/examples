import React, { useRef, useCallback, useEffect, useMemo, useContext } from "react";
import { EngineContext, KeyboardContext } from "../context";
import { useTicker } from "../hooks";

type KeyboardProps = {
  children: React.ReactNode;
}

export const Keyboard: React.FC<KeyboardProps> = ({ children }) => {
  const { onPause, onDebug } = useContext(EngineContext);
  const down = useRef<Set<string>>(new Set());
  const pressed = useRef<Set<string>>(new Set());

  const isKeyDown = useCallback((code: string) => {
    return down.current.has(code);
  }, []);

  const isKeyPressed = useCallback((code: string) => {
    return pressed.current.has(code);
  }, []);

  const hasKeyAxis = useCallback((negative: string, positive: string) => {
    return +isKeyDown(positive) - +isKeyDown(negative);
  }, [isKeyDown]);

  /**
   * When a key is pressed down, add it to the 'down' list.
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    down.current.add(event.code);
  }, []);

  /**
   * When a key is released, remove it from the 'down' list, and add it to the
   * 'pressed' list, but only for one animation frame, allowing components to
   * check whether a key was just pressed.
   */
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    down.current.delete(event.code);
    pressed.current.add(event.code);
    requestAnimationFrame(() => pressed.current.delete(event.code));
  }, []);

  /**
   * Attach key event handlers to the window, to capture all events.
   */
  useEffect(() => {
    addEventListener('keydown', handleKeyDown);
    addEventListener('keyup', handleKeyUp);

    return () => {
      removeEventListener('keydown', handleKeyDown);
      removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  /**
   * Toggle pause, and toggle debug mode.
   */
  useTicker(() => {
    if (isKeyPressed('KeyP')) {
      onPause();
    }
    if (isKeyPressed('KeyO')) {
      onDebug();
    }
  });

  const context = useMemo(
    () => ({ isKeyDown, isKeyPressed, hasKeyAxis }),
    [isKeyDown, isKeyPressed, hasKeyAxis]
  );

  return (
    <KeyboardContext.Provider value={context}>
      {children}
    </KeyboardContext.Provider>
  );
};
