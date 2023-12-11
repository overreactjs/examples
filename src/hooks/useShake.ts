import { RefObject, useCallback, useMemo } from "react";
import { useElement, useProperty, useDynamicProperty, Position, useUpdate, useRender } from "@engine";
import { UseElementResult } from "src/engine/hooks/useElement";

type UseShakeProps<E extends Element> = {
  element?: UseElementResult<E>;
  strength?: number;
  phase?: number;
}

type UseShakeResult<E extends Element> = {
  ref: RefObject<E>;
  shake: () => void;
}

export function useShake<E extends Element>(props?: UseShakeProps<E>): UseShakeResult<E> {
  const element = useElement<E>(props?.element);
  const amount = useProperty(0);
  const strength = useProperty(props?.strength || 40);
  const phase = useProperty(props?.phase || 30);

  const pos = useDynamicProperty(amount, (amount): Position => ([
    Math.sin(amount / phase.current) * strength.current * (amount / 500),
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
}
