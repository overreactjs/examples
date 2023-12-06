import React, { useContext, useRef } from "react";
import { GameState } from "../state";
import { Property, useKeyPressed } from "@engine";

export const GameContext = React.createContext<Property<GameState>>({ current: new GameState() });

export const useGame = () => {
  return useContext(GameContext);
}

type GameProps = {
  children: React.ReactNode;
}

export const Game: React.FC<GameProps> = ({ children }) => {
  const state = useRef(new GameState());

  useKeyPressed('KeyO', () => {
    console.log(state.current);
  });

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  );
};
