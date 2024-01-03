import { createContext, useContext } from "react";
import { ButtonsGameState } from "./ButtonsGameState";

export const ButtonsGameContext = createContext<ButtonsGameState>(new ButtonsGameState());

export const useButtonsGame = () => {
  return useContext(ButtonsGameContext);
};
