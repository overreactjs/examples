import { useElement, useProperty, useRender, useUpdate } from "@engine";

export const Debug: React.FC = () => {
  const fpsElement = useElement();
  const fps = useProperty(new SlidingWindow(30));

  useUpdate((delta) => {
    fps.current.push(1000 / delta);
  });

  useRender(() => {
    fpsElement.setText(fps.current.mean().toFixed(0) + ' fps');
  });

  return (
    <div className="absolute top-8 right-8 mix-blend-difference text-white">
      <div className="tabular-nums" ref={fpsElement.ref} />
    </div>
  );
};

class SlidingWindow {
  values: number[] = [];
  size: number;
  index: number = 0;
  
  constructor(size: number) {
    this.size = size;
  }

  push(value: number) {
    this.values[this.index] = value;
    this.index = (this.index + 1) % this.size;
  }

  mean(): number {
    return this.values.reduce((result, current) => result + current, 0) / this.size;
  }
}