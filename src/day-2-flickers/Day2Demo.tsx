import { Device, Engine, useElement, useProperty, useRender, useUpdate } from "@overreact/engine";

const COLORS = [
  '#6df7c1',
  '#11adc1',
  '#606c81',
  '#1e8875',
  '#5bb361',
  '#a1e55a',
  '#f7e476',
  '#f99252',
  '#cb4d68',
  '#6a3771',
  '#c92464',
  '#f48cb6',
  '#f7b69e',
  '#9b9c82',
];

export const Day2Demo = () => {
  return (
    <Engine>
      <Device bg="#393457">
        <Flickers />
      </Device>
    </Engine>
  );
};

const Flickers = (): JSX.Element => {
  const flickers = (new Array(70)).fill(true);

  return (
    <div className="w-full h-full grid content-center">
      <div className="w-full h-full grid grid-cols-10 gap-4 p-4 box-border" style={{ transform: 'perspective(400px)' }}>
        {(flickers || []).map((_, index) => (
          <Flicker key={index} />
        ))}
      </div>
    </div>
  );
};

const Flicker = (): JSX.Element => {
  const element = useElement();
  const front = useElement();
  const next = useElement();

  const t = useProperty(0);
  const index = useProperty(Math.floor(Math.random() * COLORS.length));
  const color = useProperty(COLORS[index.current]);
  const nextColor = useProperty(color.current);

  const ttl = useProperty(Math.random() * 2000);
  const active = useProperty(false);

  /**
   * Activate the flicker once the cooldown period has ended. When active, advance through the
   * animation, deactivating once complete.
   */
  useUpdate((delta) => {
    if (!active.current) {
      ttl.current -= delta;

      if (ttl.current <= 0) {
        active.current = true;
        index.current = (index.current + Math.floor(Math.random() * (COLORS.length - 2)) + 1) % COLORS.length;
        nextColor.current = COLORS[index.current];
      }
    }

    if (active.current) {
      t.current += delta / 1600;

      if (t.current >= 1) {
        t.current = 0;
        active.current = false;
        ttl.current = Math.random() * 2000;
        color.current = nextColor.current;
      }
    }
  });

  useRender(() => {
    if (element.ref.current && front.ref.current) {
      if (t.invalidated) {
        t.invalidated = false;
        const value = easeOutBounce(t.current);
        const angle = value * 180;
        const brightness = value < 0.5 ? value + 1 : value;

        front.setStyle('transform', `rotate3d(1, 1, 0, ${angle}deg)`);
        front.setStyle('filter', `brightness(${brightness})`);

        if (value >= 0.5) {
          front.setStyle('background', nextColor.current);
        }
      }

      if (nextColor.invalidated) {
        nextColor.invalidated = false;

        next.setStyle('background', nextColor.current);
      }

      if (color.invalidated) {
        color.invalidated = false;

        element.setStyle('background', nextColor.current);
      }

      if (active.invalidated) {
        active.invalidated = false;

        front.setStyle('display', ttl.current > 0 ? 'none' : 'block');
        next.setStyle('display', ttl.current > 0 ? 'none' : 'block');
      }
    }
  });

  return (
    <div
      ref={element.ref}
      className="w-full h-full aspect-square rounded-md"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={next.ref}
        className="absolute top-0 left-0 w-full h-full rounded-md"
        style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%', display: 'none' }}
      />
      <div
        ref={front.ref}
        className="absolute top-0 left-0 w-full h-full rounded-md"
        style={{ background: color.current, display: 'none' }}
      />
    </div>
  );
};

/**
 * An easing function that creates a bouncing effect, as though an object is physically moving.
 */
const easeOutBounce = (x: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;
  
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};
