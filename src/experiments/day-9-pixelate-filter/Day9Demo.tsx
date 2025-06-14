import { Device, Engine, useElement, useRender, useSync, useTime } from "@overreact/engine";
import images from "./assets";

export const Day9Demo = () => {
  return (
    <Engine>
      <Device bg="black">
        <PixelateFilter />
      </Device>
    </Engine>
  );
};

const PixelateFilter = () => {
  const image = useElement<HTMLImageElement>();
  const feComposite = useElement<SVGFECompositeElement>();
  const feMorphology = useElement<SVGFEMorphologyElement>();

  const time = useTime();

  // Image index. Switch to a new image at the end of each iteration.
  const index = useSync(() => Math.floor(time.current / 5000 + 0.5) % images.length);

  useRender(() => {
    // One iteration every 5 seconds.
    const phase = time.current / 5000;

    // Generate a triangle wave form from the time.
    const wave = Math.abs(phase - Math.floor(phase + 0.5)) * 2;

    // Size between 1 and 40.
    const size = Math.max(1, Math.floor(wave * 48) - 8);

    // Fully opaque for lower sizes, fading out to full transparent.
    const opacity = (38 - size) / 16;

    // Update the filter attributes.
    feComposite.setAttribute('width', size);
    feComposite.setAttribute('height', size);
    feMorphology.setAttribute('radius', Math.max(size / 2));

    // Update the image styles.
    image.setStyle('filter', size > 3 ? 'url(#pixelate)' : 'none');
    image.setStyle('opacity', opacity);
  });

  return (
    <>
      <img ref={image.ref} src={images[index]} className="w-full h-full object-cover scale-105" />
      <svg className="absolute inset-0">
        <defs>
          <filter id="pixelate" x="0" y="0" width="1" height="1">
            <feConvolveMatrix
              kernelMatrix="1 1 1 1 1 1 1 1 1"
              result="AVG"
            />
            <feFlood
              x="1"
              y="1"
              width="1"
              height="1"
            />
            <feComposite
              ref={feComposite.ref}
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="0"
              k4="0"
            />
            <feTile
              result="TILE"
            />
            <feComposite
              in="AVG"
              in2="TILE"
              operator="in"
              k1="0"
              k2="1"
              k3="0"
              k4="0"
            />
            <feMorphology
              ref={feMorphology.ref}
              operator="dilate"
              result="NORMAL"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
