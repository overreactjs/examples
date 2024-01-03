import { Prop, lerp, useElement, useProperty, useRender, useSpeech, useUpdate } from "@overreact/engine";
import { AnimalConfig } from "./constants";

type AnimalProps = {
  animal: AnimalConfig;
  index: number;
  count: number;
  selected: Prop<number>;
}

export const Animal: React.FC<AnimalProps> = ({ animal, index, count, ...props }) => {
  const { speak } = useSpeech();
  
  const element = useElement();
  const selected = useProperty(props.selected);
  const opacity = useProperty(0);

  useUpdate((delta) => {
    const target = index === selected.current ? 1 : 0;
    const rate = index === selected.current ? 0.0012 : 0.024;
    opacity.current = lerp(opacity.current, target, rate * delta);
  });

  useRender(() => {
    element.setBaseStyles({ opacity });
  });

  return (
    <div ref={element.ref} className="w-[var(--width)] h-[var(--height)] -translate-x-[50%]">
      <div className="w-full h-full py-[20%] box-border flex flex-col items-center justify-between">
        <div className="h-[25%] grid place-items-center">
          <div className="text-center">
            <div className="opacity-50 text-lg">{index + 1} / {count}</div>
            <h1 className="m-0 mt-4 text-6xl">{animal.name}</h1>
          </div>
        </div>
        <img src={animal.url} className="max-w-[60%] max-h-[50%]" />
        <div className="h-[25%] grid place-items-center">
          <button onClick={() => speak(animal.name)}>
            <svg viewBox="0 0 24 24" className="w-16 h-16">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
