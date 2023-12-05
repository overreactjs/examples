import React from "react";

type KeyboardContextProps = {
  isKeyDown: (code: string) => boolean;
  isKeyPressed: (code: string) => boolean;
  hasKeyAxis: (negative: string, positive: string) => number;
}

export const KeyboardContext = React.createContext<KeyboardContextProps>({
  isKeyDown: () => false,
  isKeyPressed: () => false,
  hasKeyAxis: () => 0,
});