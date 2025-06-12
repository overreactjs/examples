import React, { RefObject, useContext } from "react";
import { PairsGameState } from "./PairsGameState";

export const PairsGameContext = React.createContext<RefObject<PairsGameState>>({
  current: new PairsGameState(),
});

export const usePairsGame = () => {
  return useContext(PairsGameContext);
};
