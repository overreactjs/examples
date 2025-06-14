import { Device, Engine, useProperty, useUpdate } from "@overreact/engine";
import { ChangeEvent, useCallback, useState } from "react";
import { flushSync } from "react-dom";
import * as transitions from "./transitions";
import "./styles.css";

type TransitionType = keyof typeof transitions;

const COLORS = ['#46425e', '#15788c', '#00b9be', '#ffeecc', '#ffb0a3', '#ff6973'];

export const Day8Demo = () => {
  const [type, setType] = useState<TransitionType>('circleIn');

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => setType(event.target.value as TransitionType);

  return (
    <Engine>
      <Device bg="white">
        <div className="w-full h-full flex flex-col">
          <div className="p-4 bg-neutral-900">
            <select value={type} onChange={onChange} className="bg-neutral-950 text-neutral-100 p-2 rounded-md">
              <option value="circleIn">Circle, In</option>
              <option value="circleOut">Circle, Out</option>
              <option value="fade">Fade</option>
              <option value="grid">Grid</option>
              <option value="origami">Origami</option>
              <option value="shutters">Shutters</option>
              <option value="squareIn">Square, In</option>
              <option value="squareOut">Square, Out</option>
              <option value="swipeDown">Swipe, Down</option>
              <option value="swipeLeft">Swipe, Left</option>
              <option value="swipeRight">Swipe, Right</option>
              <option value="swipeUp">Swipe, Up</option>
            </select>
          </div>
          <div className="grow">
            <Slide type={type} />
          </div>
        </div>
      </Device>
    </Engine>
  );
};

/**
 * 
 */
const Slide = ({ type }: { type: TransitionType }) => {
  const transition = useViewTransition(type);
  const [index, setIndex] = useState(0);

  const active = useProperty(false);

  useUpdate(() => {
    if (!active.current) {
      active.current = true;

      transition(() => {
        setIndex((index) => (index + 1) % COLORS.length);
      }).then(() => {
        active.current = false;
      });  
    }
  });

  return <div className="w-full h-full slide" style={{ background: COLORS[index] }} />;
};

/**
 * 
 */
const useViewTransition = (type: TransitionType) => {  
  return useCallback(async (fn: () => void) => {
    const isSupported = !!document.startViewTransition;
    const isSuppressed = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

    if (!isSupported || isSuppressed) {
      fn();
    }

    const {
      name,
      animation,
      duration = 1000,
      easing = 'ease',
      pseudoElement = '::view-transition-new(slide)',
    } = transitions[type]();

    document.documentElement.classList.add(name);
    
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        fn();
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(animation, { duration, easing, pseudoElement });
    });

    try {
      await transition.finished;
    } finally {
      document.documentElement.classList.remove(name);
    }
  }, [type]);
};


