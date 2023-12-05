import React from "react";
import { PhysicsUpdateFunction } from "../types";

type PhysicsContextProps = {
  register: (body: Matter.Body, fn: PhysicsUpdateFunction) => () => void;
  setGravity: (angle: number) => void;
}

export const PhysicsContext = React.createContext<PhysicsContextProps>({
  register: () => () => {},
  setGravity: () => {},
});
