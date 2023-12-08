import React, { useMemo } from "react";
import { Position, Property } from "../types";
import { useElement, useLogMount, useProperty, useRender } from "../hooks";

type ViewportContextProps = {
  origin?: Property<Position>;
}

export const ViewportContext = React.createContext<ViewportContextProps>({
  origin: undefined,
});

/**
 * Viewport
 * --------
 * 
 * Hides everything outside of it, and can be controlled by a nested camera.
 */

type ViewportProps = {
  children: React.ReactNode;
}

export const Viewport: React.FC<ViewportProps> = ({ children }) => {
  const element = useElement<HTMLDivElement>();

  useLogMount('Viewport');

  const origin = useProperty<Position>([0, 0]);
  const context = useMemo(() => ({ origin }), [origin]);

  useRender(() => {
    const [x, y] = origin.current;
    element.setStyle('transform', `translate(${-Math.round(x)}px, ${-Math.round(y)}px)`);
  });

  return (
    <div className="overflow-hidden w-full h-full">
      <div ref={element.ref} className="relative left-[50%] top-[50%] bg-yellow-500 h-0 w-0">
        <ViewportContext.Provider value={context}>
          {children}
        </ViewportContext.Provider>
      </div>
    </div>
  );
}
