import { Device, Engine, randi, useDevice, useElement, useFixedUpdate, usePointer, usePropertyListen, useRender, useUpdate } from "@overreact/engine";
import { useState } from "react";
import { Bombs } from "./Bombs";
import { BombState } from "./BombState";
import { TerrainState } from "./TerrainState";

export const Day11Demo = () => {
  return (
    <Engine>
      <Device bg="#0092E0" showFPS>
        <div className="w-full h-full bg-gradient-to-b from-[#0068e0] via-[#0092E0] to-[#0092E0]">
          <Terrain />
        </div>
      </Device>
    </Engine>
  );
};

const Terrain = () => {
  const device = useDevice();
  const pointer = usePointer();

  const svg = useElement<SVGSVGElement>();
  const shapes = useElement<SVGGElement>();

  const [bombs] = useState<Set<BombState>>(new Set());
  const [terrain] = useState(new TerrainState());

  /**
   * Drop bombs at a fixed interval.
   */
  useFixedUpdate(8, () => {
    if (pointer.isDown()) {
      const [x, y] = pointer.pos.current;
      bombs.add(new BombState([x + randi(40) - 20, y]));
    }
  });

  /**
   * Update the position and velocity of all bombs, then check for collisions.
   */
  useUpdate((delta) => {
    for (const bomb of bombs) {
      bomb.velocity.current[1] = bomb.velocity.current[1] + 0.002 * delta;
      bomb.pos.current[0] += bomb.velocity.current[0] * delta;
      bomb.pos.current[1] += bomb.velocity.current[1] * delta;

      if (bomb.pos.current[1] > device.size.current[1]) {
        bombs.delete(bomb);
      }
      
      if (terrain.contains(bomb.pos.current)) {
        terrain.blast(bomb.pos.current);
        bombs.delete(bomb);
      }
    }
  });

  /**
   * Update the SVG rendering of the terrain when it changes.
   */
  useRender(() => {
    if (shapes.ref.current && terrain.invalidated) {
      terrain.invalidated = false;
      shapes.ref.current.innerHTML = terrain.svg();
    }
  });

  /**
   * Generate terrain to match the dimensions of the viewport.
   */
  usePropertyListen(device.size, ([w, h]) => {
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    terrain.generate(w, h);
  });

  return (
    <>
      <svg ref={svg.ref} width="500" height="500" className="absolute top-0 left-0">
        <defs>
          <linearGradient id="background" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#401D00" />
            <stop offset="100%" stop-color="#000000" />
          </linearGradient>
          <linearGradient id="soil-light" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#954400" />
            <stop offset="100%" stop-color="#723400" />
          </linearGradient>
          <linearGradient id="soil-dark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#622D00" />
            <stop offset="100%" stop-color="#401D00" />
          </linearGradient>
        </defs>
        <g ref={shapes.ref} />
      </svg>
      <Bombs bombs={bombs} />
    </>
  );
};


