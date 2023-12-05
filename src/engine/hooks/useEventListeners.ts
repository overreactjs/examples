import { useRef, useCallback, useMemo } from "react";

type EventHandler = () => void;

type UseEventListenersResult<E> = {
  addEventListener: (type: E, fn: EventHandler) => void;
  fireEvent: (type: E) => void;
}

export function useEventListeners<E>(): UseEventListenersResult<E> {
  const listeners = useRef<Map<E, Set<EventHandler>>>(new Map());

  const addEventListener = useCallback((type: E, fn: EventHandler) => {
    if (!listeners.current.has(type)) {
      listeners.current.set(type, new Set());
    }

    listeners.current.get(type)?.add(fn);
  }, []);

  const fireEvent = useCallback((type: E) => {
    for (const listener of listeners.current.get(type) || []) {
      listener();
    }
  }, []);

  return useMemo(() => ({ addEventListener, fireEvent }), [addEventListener, fireEvent]);
}
