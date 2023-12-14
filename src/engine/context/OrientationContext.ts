import React from "react";
import { Property } from "../types";

export type OrientationContextProps = {
  alpha: Property<number>;
  beta: Property<number>;
  gamma: Property<number>;
  activate: () => void;
};

export const OrientationContext = React.createContext<OrientationContextProps>({
  alpha: { current: 0 },
  beta: { current: 0 },
  gamma: { current: 0 },
  activate: () => {},
});
