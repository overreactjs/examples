import React, { useContext, useRef } from "react";
import { Property } from "@engine";
import { PairsGameState } from "./PairsGameState";

export const PairsGameContext = React.createContext<Property<PairsGameState>>({
  current: new PairsGameState(),
});

export const usePairsGame = () => {
  return useContext(PairsGameContext);
}

type PairsGameProps = {
  children: React.ReactNode;
}

export const PairsGame: React.FC<PairsGameProps> = ({ children }) => {
  const state = useRef(new PairsGameState());

  return (
    <PairsGameContext.Provider value={state}>
      {children}
    </PairsGameContext.Provider>
  );
};
