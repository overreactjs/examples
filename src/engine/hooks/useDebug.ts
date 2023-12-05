import { useContext } from "react";
import { NodeContext } from "../context";

export const useDebug = (): boolean => {
  const { debug } = useContext(NodeContext);
  return !!debug;
}
