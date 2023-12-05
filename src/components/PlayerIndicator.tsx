import { Prop, Position, useElement, useRender, usePosition } from "@engine";

type PlayerIndicatorProps = {
  pos: Prop<Position>;
  index: 0 | 1;
}

export const PlayerIndicator: React.FC<PlayerIndicatorProps> = (props) => {
  const label = useElement<HTMLDivElement>();
  const pos = usePosition(props.pos);

  useRender(() => {
    label.setBaseStyles({ pos });
  });

  return (
    <div ref={label.ref} className="absolute text-white text-2xl font-bold">
      <div className={`-translate-x-1/2 ${props.index === 0 ? 'text-red-500' : 'text-cyan-500'}`}>
        P{props.index + 1}
      </div>
    </div>
  );
};
