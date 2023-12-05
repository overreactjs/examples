import React from "react";
import { Body } from "detect-collisions";
import { CollisionUpdateFunction, CollisionEventFunction } from "../types";

type WorldContextProps = {
  registerCollider: (id: string, tags: string[], body: Body, fn: CollisionUpdateFunction) => () => void;
  registerHandler: (id: string, fn: CollisionEventFunction) => () => void;
}

export const WorldContext = React.createContext<WorldContextProps>({
  registerCollider: () => () => {},
  registerHandler: () => () => {},
});
