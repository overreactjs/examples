import { useElement, usePosition, useProperty, useRender } from "../hooks";
import { Position, Prop, Size } from "../types";
import { Node } from "./Node";

/**
 * Rectangle
 * ---------
 * 
 * ...
 */

type RectangleProps = {
  pos?: Prop<Position>;
  size: Prop<Size>;
  color?: Prop<string>;
  children?: React.ReactNode;
};

export const Rectangle: React.FC<RectangleProps> = (props) => {
  const element = useElement<HTMLDivElement>();

  const pos = usePosition(props.pos);
  const size = useProperty<Size>(props.size);
  const color = useProperty<string>(props.color || 'transparent');

  useRender(() => {
    element.setBaseStyles({ pos, size });
    element.setStyle('backgroundColor', color.current);
  });

  return (
    <Node pos={pos}>
      <div ref={element.ref} className="absolute" style={{ contain: 'content' }}>
        {props.children}
      </div>
    </Node>
  );
}
