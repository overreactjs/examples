import { clamp, randi } from "@overreact/engine";

type Transition = {
  name: string;
  animation: PropertyIndexedKeyframes;
  duration?: number;
  easing?: string;
  pseudoElement?: string;
};

/**
 * 
 */
export const circleIn = (): Transition => {
  const x = window.innerWidth / 2 + randi(400) - 200;
  const y = window.innerHeight / 2 + randi(400) - 200;

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const start = `circle(0px at ${x}px ${y}px)`;
  const end = `circle(${endRadius}px at ${x}px ${y}px)`;

  return {
    name: 'circleIn',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const circleOut = (): Transition => {
  const x = window.innerWidth / 2 + randi(400) - 200;
  const y = window.innerHeight / 2 + randi(400) - 200;

  const startRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const start = `circle(${startRadius}px at ${x}px ${y}px)`;
  const end = `circle(0px at ${x}px ${y}px)`;

  return {
    name: 'circleOut',
    animation: { clipPath: [start, end] },
    pseudoElement: '::view-transition-old(slide)',
  };
};

/**
 * 
 */
export const fade = (): Transition => {
  return {
    name: 'fade',
    animation: { opacity: ['0', '1'] },
  };
};

/**
 * 
 */
export const grid = (): Transition => {
  const size = 100;
  const cols = Math.ceil(window.innerWidth / size);
  const rows = Math.ceil(window.innerHeight / size);
  const count = cols + rows + 10;

  const frames = [];

  const buildFrame = (x: number, y: number, i: number): string => {
    const index = clamp(i - (x + y), 0, 10);
    const sx = (x + ((10 - index) / 20)) * size;
    const sy = (y + ((10 - index) / 20)) * size;
    const cs = index * 10;

    return `M${sx},${sy} l${cs},0 l0,${cs} l${-cs},0 Z `;
  };

  for (let i = 0; i < count; i++) {
    let frame = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        frame += buildFrame(x, y, i);
      }
    }

    frames.push(`path('${frame}')`);
  }

  console.log(frames);

  return {
    name: 'grid',
    animation: { clipPath: frames },
    duration: frames.length * 50,
    easing: 'linear',
  };
};

/**
 * 
 */
export const origami = (): Transition => {
  const start = 'polygon(50% 50%, 50% 25%, 50% 50%, 75% 50%, 50% 50%, 50% 75%, 50% 50%, 25% 50%)';
  const end = 'polygon(0 0, 50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%)';

  return {
    name: 'origami',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const shutters = (): Transition => {
  const start = 'polygon(20% 100%, 20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%)';
  const end = 'polygon(0% 100%, 0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%)';

  return {
    name: 'shutters',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const squareIn = (): Transition => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const max = Math.max(window.innerWidth, window.innerHeight);

  const dx = (max - w) / 2;
  const dy = (max - h) / 2;
  
  const top = Math.min(0 - dy);
  const right = Math.max(w + dx);
  const bottom = Math.max(h + dy);
  const left = Math.max(0 - dx);

  const start = 'rect(50% 50% 50% 50%)';
  const end = `rect(${top}px ${right}px ${bottom}px ${left}px)`;

  return {
    name: 'squareIn',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const squareOut = (): Transition => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const max = Math.max(window.innerWidth, window.innerHeight);

  const dx = (max - w) / 2;
  const dy = (max - h) / 2;
  
  const top = Math.min(0 - dy);
  const right = Math.max(w + dx);
  const bottom = Math.max(h + dy);
  const left = Math.max(0 - dx);

  const start = `rect(${top}px ${right}px ${bottom}px ${left}px)`;
  const end = 'rect(50% 50% 50% 50%)';

  return {
    name: 'squareOut',
    animation: { clipPath: [start, end] },
    pseudoElement: '::view-transition-old(slide)',
  };
};

/**
 * 
 */
export const swipeDown = (): Transition => {
  const start = 'rect(0% 100% 0% 0%)';
  const end = 'rect(0% 100% 100% 0%)';

  return {
    name: 'swipeDown',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const swipeLeft = (): Transition => {
  const start = 'rect(0% 100% 100% 100%)';
  const end = 'rect(0% 100% 100% 0%)';

  return {
    name: 'swipeLeft',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const swipeRight = (): Transition => {
  const start = 'rect(0% 0% 100% 0%)';
  const end = 'rect(0% 100% 100% 0%)';

  return {
    name: 'swipeRight',
    animation: { clipPath: [start, end] },
  };
};

/**
 * 
 */
export const swipeUp = (): Transition => {
  const start = 'rect(100% 100% 100% 0%)';
  const end = 'rect(0% 100% 100% 0%)';

  return {
    name: 'swipeUp',
    animation: { clipPath: [start, end] },
  };
};
