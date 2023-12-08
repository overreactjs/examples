import React from "react";
import { Position, Property } from "../types";

type TouchContextProps = {
  pos: Property<Position>;
  isDown: () => boolean;
  isPressed: () => boolean;
};

export const TouchContext = React.createContext<TouchContextProps>({
  pos: { current: [0, 0] },
  isDown: () => false,
  isPressed: () => false,
});
