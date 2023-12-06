import { useRef, useCallback, useMemo } from "react";
import { UpdateFunction, RenderFunction } from "../types";
import { useRender } from "./useRender";
import { useUpdate } from "./useUpdate";

export const useNode = () => {
  const updates = useRef<Map<string, UpdateFunction>>(new Map());
  const renders = useRef<Map<string, RenderFunction>>(new Map());

  const update = useCallback((delta: number, time: number) => {
    for (const entry of updates.current) {
      entry[1](delta, time);
    }
  }, []);

  const render = useCallback(() => {
    for (const entry of renders.current) {
      entry[1]();
    }
  }, []);

  const registerUpdate = useCallback((id: string, fn: UpdateFunction) => {
    updates.current.set(id, fn);
    return () => updates.current.delete(id);
  }, []);

  const registerRender = useCallback((id: string, fn: RenderFunction) => {
    renders.current.set(id, fn);
    return () => renders.current.delete(id);
  }, []);

  useUpdate(update);
  useRender(render);

  return useMemo(
    () => ({ update, render, registerUpdate, registerRender }),
    [update, render, registerUpdate, registerRender]
  );
}