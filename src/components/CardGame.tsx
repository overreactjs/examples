import React, { useContext, useRef } from "react";
import { CardsState } from "../state";
import { Property } from "@engine";

export const CardGameContext = React.createContext<Property<CardsState>>({
  current: new CardsState(),
});

export const useCardGame = () => {
  return useContext(CardGameContext);
}

type CardGameProps = {
  children: React.ReactNode;
}

export const CardGame: React.FC<CardGameProps> = ({ children }) => {
  const state = useRef(new CardsState());

  return (
    <CardGameContext.Provider value={state}>
      {children}
    </CardGameContext.Provider>
  );
};
