import { useContext } from "react";
import { KeyboardContext } from "../context";

export const useKeyboard = () => {
  return useContext(KeyboardContext);
};
