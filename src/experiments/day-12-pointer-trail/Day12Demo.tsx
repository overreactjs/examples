import { clamp, Device, Engine, EngineContext, ParticleEngine, Particles, Position, useDevice, useElement, useParticles, usePointer, useProperty, usePropertyListen, useRender, useUpdate } from "@overreact/engine";
import { useContext } from "react";
import { SlidingWindow } from "./SlidingWindow";
import "./styles.css";
import { Spark } from "./Spark";

export const Day12Demo = () => {
  return (
    <Engine>
      <ParticleEngine pool={200}>
        <Device bg="black" showFPS>
          <div className="w-full h-full bg-black effect-trail">
            <Viewport />
          </div>
        </Device>
      </ParticleEngine>
    </Engine>
  );
};

const Viewport = () => {
  const { fps } = useContext(EngineContext);
  const device = useDevice();
  const pointer = usePointer();
  const particles = useParticles();

  const svg = useElement<SVGSVGElement>();
  const path = useElement<SVGGElement>();

  const points = useProperty(new SlidingWindow<Position>(120));

  /**
   * Track the mouse pointer position when the mouse button is down. Otherwise, put NaN into the
   * collection instead, so that we get gaps when the user lifts off.
   */
  useUpdate(() => {
    if (pointer.isDown()) {
      const [x, y] = pointer.pos.current;
      points.current.push([x, y]);
      particles.attach(new Spark([x, y]))
    } else {
      points.current.push([NaN, NaN]);
    }
  });

  /**
   * 
   */
  useRender(() => {
    const rate = fps.current.mean();
    const [...values] = points.current.values.slice(-Math.floor(rate));

    let html = '';

    for (let i = 0; i < values.length - 1; i++) {
      const [ax, ay] = values[i];
      const [bx, by] = values[i + 1];

      if (ax >= 0 && ay >= 0 && bx >= 0 && by >= 0) {
        const percentage = i / values.length;
        const width = clamp(percentage * 300, 2, 40);
        const color = `hsl(45deg 100% ${clamp(percentage * 100, 0, 100)}%)`;
        const segment = `<path d="M ${ax} ${ay} L ${bx} ${by}" stroke-width="${width}" style="stroke: ${color}" />`;

        html += segment;
      }
    }

    if (path.ref.current) {
      path.ref.current.innerHTML = html;
    }
  });

  /**
   * Update the SVG element to match the size of the device.
   */
  usePropertyListen(device.size, ([w, h]) => {
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
  });

  return (
    <>
      <svg ref={svg.ref} width="100" height="100" className="absolute top-0 left-0 bg-black effect-trail">
        <g fill="none" strokeLinecap="round" ref={path.ref} />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full">
        <Particles />
      </div>
    </>
  );
};
