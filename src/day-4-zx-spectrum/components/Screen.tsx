import { useElement, useDevice, useRender, Size, useProperty, Prop } from "@overreact/engine";
import crtUrl from "../assets/crt.png";

const CRT_FILTER_OUTER = { filter: 'blur(0.33px) brightness(1.5) contrast(1.2)' };
const CRT_FILTER_INNER = { backgroundImage: `url(${crtUrl})`, backgroundSize: '1px' };

type ScreenProps = {
  children: React.ReactNode;
  size: Prop<Size>;
  scale: number | 'auto';
}

export const Screen: React.FC<ScreenProps> = ({ children, scale, ...props }) => {
  const element = useElement();
  const device = useDevice();
  const size = useProperty(props.size);

  useRender(() => {
    if (size.invalidated) {
      element.setStyle('width', `${size.current[0]}px`);
      element.setStyle('height', `${size.current[1]}px`);

      size.invalidated = false;
    }

    if (device.size.invalidated || size.invalidated) {
      if (scale === 'auto') {
        const [width, height] = device.size.current;
        const widthScale = Math.floor(width / size.current[0]);
        const heightScale = Math.floor(height / size.current[1]);
        const autoScale = Math.min(widthScale, heightScale);

        element.setLegacyStyle('scale', autoScale);
      } else {
        element.setLegacyStyle('scale', scale);
      }

      device.size.invalidated = false;
    }
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div ref={element.ref} style={CRT_FILTER_OUTER}>
        {children}
        <div className="absolute top-0 left-0 w-full h-full z-[1000]" style={CRT_FILTER_INNER} />
      </div>
    </div>
  );
};
