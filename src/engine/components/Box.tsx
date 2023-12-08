import { useElement, usePosition, useProperty, useRender } from "../hooks";
import { Position, Prop, Size } from "../types";
import { Node } from "./Node";

type BoxProps = {
  pos?: Prop<Position>;
  size: Prop<Size>;
  angle?: Prop<number>;
  color?: Prop<string>;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Box
 * ---
 * 
 * ...
 */
export const Box: React.FC<BoxProps> = ({ className, ...props }) => {
  const element = useElement<HTMLDivElement>();

  const pos = usePosition(props.pos);
  const size = useProperty(props.size);
  const angle = useProperty(props.angle || 0);
  const color = useProperty(props.color || 'transparent');

  useRender(() => {
    element.setBaseStyles({ pos, size, angle });
    element.setStyle('backgroundColor', color.current);
  });

  return (
    <Node pos={pos}>
      <div ref={element.ref} className={`absolute ${className}`} style={{ contain: 'content' }}>
        {props.children}
      </div>
    </Node>
  );
}
