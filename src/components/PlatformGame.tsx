import React, { useContext, useRef } from "react";
import { PlatformState } from "../state";
import { Property } from "@engine";

export const PlatformGameContext = React.createContext<Property<PlatformState>>({
  current: new PlatformState(),
});

export const usePlatformGame = () => {
  return useContext(PlatformGameContext);
}

type PlatformGameProps = {
  children: React.ReactNode;
}

export const PlatformGame: React.FC<PlatformGameProps> = ({ children }) => {
  const state = useRef(new PlatformState());

  return (
    <PlatformGameContext.Provider value={state}>
      {children}
    </PlatformGameContext.Provider>
  );
};
