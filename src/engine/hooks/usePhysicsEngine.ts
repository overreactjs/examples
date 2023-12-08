import { useContext } from "react";
import { PhysicsContext } from "../context";

export const usePhysicsEngine = () => {
  return useContext(PhysicsContext);
};
