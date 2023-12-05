import { useContext, useLayoutEffect } from "react";
import { Property } from "../types";
import { SpriteSetContext } from "../components";

export const useSpriteSet = (name: string, element: Property<HTMLOrSVGElement | null>, reset: () => void) => {
  const { register } = useContext(SpriteSetContext);
  useLayoutEffect(() => register(name, element, reset), [element, name, register, reset]);
}