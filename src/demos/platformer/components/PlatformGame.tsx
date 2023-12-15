import React, { useContext, useRef } from "react";
import { PlatformGameState } from "../state";
import { Property } from "@engine";

export const PlatformGameContext = React.createContext<Property<PlatformGameState>>({
  current: new PlatformGameState(),
});

export const usePlatformGame = () => {
  return useContext(PlatformGameContext);
}

type PlatformGameProps = {
  children: React.ReactNode;
}

export const PlatformGame: React.FC<PlatformGameProps> = ({ children }) => {
  const state = useRef(new PlatformGameState());

  return (
    <PlatformGameContext.Provider value={state}>
      {children}
    </PlatformGameContext.Provider>
  );
};
