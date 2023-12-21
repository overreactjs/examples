import { Prop, useElement, useProperty, useRender } from "@engine";

const RADIUS = 70;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

type TimerProps = {
  time: Prop<number>;
  score: Prop<number>;
};

export const Timer: React.FC<TimerProps> = (props) => {
  const outer = useElement<SVGCircleElement>();
  const inner = useElement<SVGCircleElement>();
  const points = useElement();

  const time = useProperty(props.time);
  const score = useProperty(props.score);

  useRender(() => {
    const value = time.current / 30000;
    const offset = Math.max(0, Math.min(CIRCUMFERENCE, CIRCUMFERENCE * (1 - value)));
    outer.setStyle('strokeDashoffset', offset);
    inner.setStyle('strokeDashoffset', offset);
    points.setText(score.current.toString());
  });

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          stroke="hsl(340deg 0% 90%)"
          strokeWidth="20"
        />
        <circle
          ref={outer.ref}
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="30"
          strokeDasharray={CIRCUMFERENCE}
        />
        <circle
          ref={inner.ref}
          cx="80"
          cy="80"
          r={RADIUS}
          fill="none"
          stroke="hsl(340deg 100% 45%)"
          strokeLinecap="round"
          strokeWidth="20"
          strokeDasharray={CIRCUMFERENCE}
        />
      </svg>
      <div ref={points.ref} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold font-[Quicksand] text-2xl text-slate-900" />
    </div>
  );
};
