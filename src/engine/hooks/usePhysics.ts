import { useCallback, useContext, useEffect, useRef } from "react";
import { Bodies } from "matter-js";
import { PhysicsContext } from "../context";
import { PhysicsUpdateFunction, Position, Property, Size } from "../types";

export const usePhysics = (
  body: Property<Matter.Body>,
  update: PhysicsUpdateFunction,
) => {
  const { register } = useContext(PhysicsContext);

  useEffect(
    () => register(body.current, update),
    [body, register, update],
  );
};

export const useBoxPhysics = (
  pos: Property<Position>,
  size: Property<Size>,
  options?: Matter.IBodyDefinition,
) => {
  const [x, y] = pos.current;
  const [w, h] = size.current;

  const body = useRef(Bodies.rectangle(x, y, w, h, options));

  const update = useCallback((body: Matter.Body) => {
    pos.current[0] = body.position.x;
    pos.current[1] = body.position.y;
  }, [pos]);

  usePhysics(body, update);
};

export const useCirclePhysics = (
  pos: Property<Position>,
  radius: Property<number>,
  options?: Matter.IBodyDefinition,
) => {
  const [x, y] = pos.current;
  const r = radius.current;

  const body = useRef(Bodies.circle(x, y, r, options));

  const update = useCallback((body: Matter.Body) => {
    pos.current[0] = body.position.x;
    pos.current[1] = body.position.y;
  }, [pos]);

  usePhysics(body, update);
};
