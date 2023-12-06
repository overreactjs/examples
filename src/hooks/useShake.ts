import { RefObject, useCallback, useMemo } from "react";
import { useElement, useProperty, useDynamicProperty, Position, useUpdate, useRender } from "@engine";

type UseShakeResult = {
  ref: RefObject<HTMLDivElement>;
  shake: () => void;
}

export const useShake = (): UseShakeResult => {
  const element = useElement<HTMLDivElement>();
  const amount = useProperty(0);

  const pos = useDynamicProperty(amount, (amount): Position => ([
    Math.sin(amount / 40) * 40 * (amount / 500),
    0,
  ]));

  useUpdate((delta) => {
    amount.current = Math.max(0, amount.current - delta);
  });

  useRender(() => {
    element.setBaseStyles({ pos });
  });

  const shake = useCallback(() => {
    amount.current = 750;
  }, [amount]);

  return useMemo(() => ({ ref: element.ref, shake }), [element.ref, shake]);
};