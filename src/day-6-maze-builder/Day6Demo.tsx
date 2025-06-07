import { useCallback, useMemo, useState } from "react";
import { Circle, Device, Engine, Tilemap, Tileset, useProperty, useUpdate } from "@overreact/engine";
import { Screen } from "./Screen";
import tileset from "./tileset.png";

const TILESET: Tileset = {
  image: {
    url: tileset,
    size: [640, 640],
  },
  tileSize: [160, 160],
  cellSize: [32, 32],
  gridSize: [24, 24],
};

export const Day6Demo = () => {
  return (
    <Engine>
      <Device bg="#ffffff" showFPS>
        <Maze />
      </Device>
    </Engine>
  );
};

/**
 * Render the maze using a tilemap, and continuously generate it, waiting a couple of seconds when
 * one maze is complete, before generating a new one.
 */
const Maze = () => {
  const { active, tiles, generate } = useMaze();
  const ttl = useProperty(0);

  useUpdate((delta) => {
    if (active.current) {
      ttl.current = 2000;
    } else if (ttl.current > 0) {
      ttl.current -= delta;
    } else {
      generate();
    }
  });

  return (
    <Screen size={[768, 768]} scale={1}>
      <div className="w-full h-full outline-[2px] outline outline-[#333333] rounded-sm">
        <Tilemap tileset={TILESET} tiles={tiles} />
        <Circle size={[16, 16]} pos={[8, 8]} color="#333333" />
        <Circle size={[16, 16]} pos={[744, 744]} color="#333333" />
      </div>
    </Screen>
  );
};

/**
 * Returns the tiles for a maze, along with a 'generate' function to trigger random generation.
 */
const useMaze = () => {
  const [tiles, setTiles] = useState(new Array(TILESET.gridSize[0] * TILESET.gridSize[1]).fill(0));
  const active = useProperty(false);

  const generate = useCallback(async () => {
    active.current = true;

    const tiles = new Array(TILESET.gridSize[0] * TILESET.gridSize[1]).fill(0);
    const candidates: number[] = [];

    const fromIndex = (index: number): [number, number] => {
      const x = index % TILESET.gridSize[0];
      const y = Math.floor(index / TILESET.gridSize[0]);
      return [x, y];
    };

    const toIndex = (x: number, y: number): number => {
      return y * TILESET.gridSize[0] + x;
    };

    const getNeighbours = (index: number) => {
      const [x, y] = fromIndex(index);
      const neighbours = [];
  
      if (x < TILESET.gridSize[0] - 1 && tiles[toIndex(x + 1, y)] === 0) {
        neighbours.push(toIndex(x + 1, y));
      }
  
      if (x > 0 && tiles[toIndex(x - 1, y)] === 0) {
        neighbours.push(toIndex(x -1, y));
      }
  
      if (y < TILESET.gridSize[1] - 1 && tiles[toIndex(x, y + 1)] === 0) {
        neighbours.push(toIndex(x, y + 1));
      }
  
      if (y > 0 && tiles[toIndex(x, y - 1)] === 0) {
        neighbours.push(toIndex(x, y - 1));
      }
  
      return neighbours;
    };

    candidates.push(Math.floor(Math.random() * tiles.length));

    let chainLength = 0;
    
    while (candidates.length > 0) {
      const cell = candidates[candidates.length - 1];

      if (cell !== undefined) {
        const neighbours = getNeighbours(cell);
        
        if (neighbours.length > 0) {
          if (chainLength < 5) {
            const neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
            candidates.push(neighbour);
            chainLength += 1;

            await wait(0);

            if (neighbour - cell === 1) {
              tiles[neighbour] = 8;
              tiles[cell] = tiles[cell] | 2;
            }

            if (neighbour - cell === -1) {
              tiles[neighbour] = 2;
              tiles[cell] = tiles[cell] | 8;
            }

            if (neighbour - cell === TILESET.gridSize[0]) {
              tiles[neighbour] = 1;
              tiles[cell] = tiles[cell] | 4;
            }

            if (neighbour - cell === -TILESET.gridSize[0]) {
              tiles[neighbour] = 4;
              tiles[cell] = tiles[cell] | 1;
            }
          } else {
            candidates.pop();
            candidates.unshift(cell);
            chainLength = 0;
          }
        } else {
          candidates.pop();
          chainLength = 0;
        }
      }
      
      setTiles([...tiles]);
    }

    active.current = false;
  }, [active]);

  return useMemo(() => ({ active, tiles, generate }), [active, tiles, generate]);
};

/**
 * Return a promise that resolves after a specific timeout.
 */
const wait = async (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
