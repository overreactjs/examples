import { useElement, usePosition, useProperty, useSpriteSet, useUpdate } from "../hooks";
import { BitmapAsset, Position, Prop, Size } from "../types";
import { BitmapImage } from "./BitmapImage";

/**
 * BitmapSprite
 * ------------
 * 
 * ...
 */

type BitmapSpriteProps = {
  name: string;
  image: Prop<BitmapAsset>;
  count: number;
  rate: number;
  pos?: Prop<Position>;
  size: Prop<Size>;
  flip?: Prop<boolean>;
  repeat?: boolean;
};

export const BitmapSprite: React.FC<BitmapSpriteProps> = (props) => {
  const element = useElement<HTMLDivElement>();

  const pos = usePosition(props.pos);
  const size = useProperty(props.size);
  const flip = useProperty(props.flip || false);
  const repeat = useProperty(props.repeat === undefined ? true : props.repeat);
  const frameCount = useProperty<number>(props.count);
  const frameRate = useProperty<number>(props.rate);
  const frameWidth = useProperty<number>(size.current[0]);
  const frameIndex = useProperty<number>(0);
  const frameTime = useProperty<number>(0);
  const offset = useProperty<Position>([0, 0]);

  useSpriteSet(props.name, element.ref, () => {
    frameIndex.current = 0;
  });

  useUpdate((delta) => {
    frameTime.current += delta;
    
    const frameMillis = 1000 / frameRate.current;
    const frameIncrement = Math.floor(frameTime.current / frameMillis);

    frameIndex.current = frameIndex.current + frameIncrement;

    if (repeat.current) {
      frameIndex.current = frameIndex.current % frameCount.current;
    }

    frameIndex.current = Math.min(frameCount.current - 1, frameIndex.current);
    frameTime.current -= frameIncrement * frameMillis;

    offset.current[0] = frameIndex.current * frameWidth.current;
  });

  return <BitmapImage element={element} image={props.image} pos={pos} size={size} offset={offset} flip={flip} />;
};
