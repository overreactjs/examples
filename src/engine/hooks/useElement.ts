import { RefObject, useCallback, useMemo, useRef } from "react";
import { Position, Size } from "../types";

export type SetStyleFn = (key: keyof CSSStyleDeclaration, value: string | number) => void;

export type SetBaseStyles = {
  pos?: RefObject<Position>;
  size?: RefObject<Size>;
  angle?: RefObject<number>;
  flip?: RefObject<boolean>;
}

export type UseElementResult<E extends Element> = {
  ref: RefObject<E>;
  setText: (test: string) => void;
  setStyle: SetStyleFn;
  setBaseStyles: (options: SetBaseStyles) => void;
}

export function useElement<E extends Element = HTMLDivElement>(element?: UseElementResult<E>): UseElementResult<E> {
  const generatedRef = useRef<Element>(null) as RefObject<E>;
  const ref = element?.ref || generatedRef;

  const setText = useCallback((text: string) => {
    if (ref.current) {
      ref.current.innerHTML = text;
    }
  }, [ref]);

  const setStyle = useCallback((key: keyof CSSStyleDeclaration, value: string | number) => {
    if (ref.current && value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((ref.current as any).style as any)[key] = value;
    }
  }, [ref]);

  const setBaseStyles = useCallback((options: SetBaseStyles) => {
    const { pos, size, angle, flip } = options;

    const transforms = [];

    if (pos?.current) {
      transforms.push(`translate(${Math.round(pos.current[0])}px, ${Math.round(pos.current[1])}px)`);
    }
    if (angle?.current) {
      transforms.push(`rotate(${angle.current}deg)`);
    }
    if (flip?.current) {
      transforms.push(`scaleX(-1)`);
    }

    setStyle('transform', transforms.join(' '));

    if (size?.current) {
      const [width, height] = size.current;
      setStyle('width', `${width}px`);
      setStyle('height', `${height}px`);
    }
  }, [setStyle]);

  return useMemo(() => {
    if (element) {
      return element;
    } else {
      return { ref, setText, setStyle, setBaseStyles };
    }
  }, [element, ref, setBaseStyles, setStyle, setText]);
}
