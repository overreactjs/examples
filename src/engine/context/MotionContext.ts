import React from "react";
import { Property } from "../types";

export type MotionContextProps = {
  acceleration: Property<[number, number, number]>;
  activate: () => void;
  isShaking: () => boolean;
};

export const MotionContext = React.createContext<MotionContextProps>({
  acceleration: { current: [0, 0, 0] },
  activate: () => {},
  isShaking: () => false,
});
