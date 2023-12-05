import React from "react";
import { Prop, Position, UpdateFunction, RenderFunction } from "../types";

type NodeContextProps = {
  debug?: boolean;
  toggleDebug?: () => void;
  pos?: Prop<Position>;
  registerUpdate: (id: string, fn: UpdateFunction) => void;
  registerRender: (id: string, fn: RenderFunction) => void;
}

export const NodeContext = React.createContext<NodeContextProps>({
  debug: false,
  toggleDebug: () => {},
  pos: [0, 0],
  registerUpdate: () => {},
  registerRender: () => {},
});
