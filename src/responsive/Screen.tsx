import { useElement, useRender, Size, useProperty, Prop } from "@overreact/engine";
import { useLayoutEffect } from "react";

type ScreenProps = {
  children: React.ReactNode;
  size: Prop<Size>;
  scale?: number | 'auto';
  expand?: 'horizontal' | 'vertical' | 'full';
}

export const Screen: React.FC<ScreenProps> = ({ children, expand, ...props }) => {
  const element = useElement();
  const text = useElement();
  const screen = useElement();

  const requestedSize = useProperty(props.size);
  const screenSize = useProperty<Size>([0, 0]);
  const size = useProperty<Size>([...requestedSize.current]);
  const scale = useProperty(1);

  useRender(() => {
    if (size.invalidated) {
      element.setStyle('width', `${size.current[0]}px`);
      element.setStyle('height', `${size.current[1]}px`);

      size.invalidated = false;
    }

    if (scale.invalidated) {
      element.setStyle('scale', scale.current);

      text.setText(JSON.stringify(screenSize.current));

      scale.invalidated = false;
    }
  });

  useLayoutEffect(() => {
    if (screen.ref.current) {
      const observer = new ResizeObserver((entries) => {
        const pixelRatio = window.devicePixelRatio;
        const width = entries[0].contentRect.width;
        const height = entries[0].contentRect.height;
        
        const widthScale = Math.floor((width / requestedSize.current[0]) * pixelRatio) / pixelRatio;
        const heightScale = Math.floor((height / requestedSize.current[1]) * pixelRatio) / pixelRatio;
        const autoScale = Math.min(widthScale, heightScale);

        scale.current = autoScale;

        const autoWidth = expand === 'horizontal' || expand === 'full' ? Math.floor(width / autoScale) : requestedSize.current[0];
        const autoHeight = expand === 'vertical' || expand === 'full' ? Math.floor(height / autoScale) : requestedSize.current[1];

        screenSize.current = [width, height];
        size.current = [autoWidth, autoHeight];
      });

      observer.observe(screen.ref.current);
    }
  }, [expand, requestedSize, scale, screen.ref, screenSize, size]);

  return (
    <div className="w-full h-full grid place-items-center" ref={screen.ref}>
      <div ref={element.ref}>
        {children}
        <div className="absolute top-8 right-8" ref={text.ref} />
      </div>
    </div>
  );
};
