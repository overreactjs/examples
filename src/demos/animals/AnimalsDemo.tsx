import { useCallback, useMemo, useRef } from "react";
import { Camera, Device, Engine, Node, Position, Viewport, clamp, useDevice, useDynamicProperty, usePointer, useProperty, useRender, useTicker, useUpdate } from "@overreact/engine";
import { ANIMALS } from "./constants";
import { Animal } from "./Animal";

export const AnimalsDemo = () => {
  return (
    <Engine>
      <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet" />
      <Device mode="mobile">
        <AnimalsGame />
      </Device>
    </Engine>
  );
};

const AnimalsGame = () => {
  const device = useDevice();
  const swipe = useSwipe();
  
  const ref = useRef<HTMLDivElement>(null);
  const selected = useProperty(0);
  const camera = useDynamicProperty(selected, (selected): Position => {
    return [0, device.size.current[1] * (selected + 0.5)];
  });

  useUpdate(() => {
    if (swipe.hasSwiped()) {
      if (swipe.distance() > 100) {
        selected.current--;
      } else if (swipe.distance() < -100) {
        selected.current++;
      }
      
      selected.current = clamp(selected.current, 0, ANIMALS.length - 1);
    }
  });

  /**
   * Use CSS custom properties to control the width and height of the animal cards.
   */
  useUpdate(() => {
    if (ref.current && device.size.invalidated) {
      ref.current.style.setProperty('--width', `${device.size.current[0]}px`);
      ref.current.style.setProperty('--height', `${device.size.current[1]}px`);
    }
  });

  /**
   * Update the background color to match the animal.
   * Note: We're using CSS transitions here, instead of manually animating the color.
   */
  useRender(() => {
    if (ref.current && selected.invalidated) {
      ref.current.style.backgroundColor = ANIMALS[selected.current].color;
      selected.invalidated = false;
    }
  });

  return (
    <div ref={ref} className="w-full h-full transition-colors duration-1000 font-['Lilita_One']">
      <Viewport>
        <Node pos={camera}>
          <Camera axis="xy" smooth />
        </Node>
        {ANIMALS.map((animal, index) => (
          <Animal key={animal.name} animal={animal} index={index} count={ANIMALS.length} selected={selected} />
        ))}
      </Viewport>
    </div>
  );
};

const useSwipe = () => {
  const pointer = usePointer();
  const started = useRef<Position | null>(null);
  const swiped = useRef(false);
  const delta = useRef<number>(0);

  const hasSwiped = useCallback((): boolean => {
    return swiped.current;
  }, []);

  const distance = useCallback((): number => {
    return delta.current;
  }, []);

  useTicker(() => {
    if (swiped.current) {
      swiped.current = false;
    }

    if (pointer.isDown()) {
      started.current = started.current || [...pointer.pos.current];
      delta.current = pointer.pos.current[1] - started.current[1];

    } else if (started.current !== null) {
      swiped.current = true;
      started.current = null;
    }
  });

  return useMemo(() => ({ hasSwiped, distance }), [hasSwiped, distance]);
};