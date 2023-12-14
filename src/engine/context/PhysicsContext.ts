import React from "react";
import { Engine } from "matter-js";
import { PhysicsUpdateFunction, Property } from "../types";

type PhysicsContextProps = {
  register: (body: Matter.Body, fn: PhysicsUpdateFunction) => () => void;
  setGravity: (x: number, y: number) => void;
  engine: Property<Engine | null>;
}

export const PhysicsContext = React.createContext<PhysicsContextProps>({
  register: () => () => {},
  setGravity: () => {},
  engine: { current: null },
});
