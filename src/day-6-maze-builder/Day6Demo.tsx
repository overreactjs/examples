import { useCallback, useMemo } from "react";
import { Circle, Device, Engine, Position, randi, Tilemap, Tileset, useProperty, useTiles, useUpdate } from "@overreact/engine";
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
      <div className="w-full h-full outline-[2px] outline outline-[#333333] bg-[#333333] rounded-sm">
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
  const tiles = useTiles(TILESET.gridSize);
  const active = useProperty(false);

  const generate = useCallback(async () => {
    active.current = true;
    tiles.update(() => 0);

    const getNeighbours = ([x, y]: Position) => {
      const neighbours: Position[] = [];
      const deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]];

      for (const [dx, dy] of deltas) {
        if (tiles.get([x + dx, y + dy]) === 0) {
          neighbours.push([x + dx, y + dy]);
        }
      }
  
      return neighbours;
    };

    // Pick a random starting point.
    const candidates: Position[] = [];
    candidates.push([randi(tiles.size[0]), randi(tiles.size[1])]);

    // Keep track of how long each generation chain is.
    let chainLength = 0;
    
    while (candidates.length > 0) {
      const cell = candidates[candidates.length - 1];

      if (cell !== undefined) {
        const neighbours = getNeighbours(cell);
        
        if (neighbours.length > 0) {
          if (chainLength < 5) {
            const value = tiles.get(cell) || 0;
            const neighbour = neighbours[randi(neighbours.length)];
            candidates.push(neighbour);
            chainLength += 1;

            await wait(0);

            // east
            if (neighbour[0] - cell[0] === 1) {
              tiles.set(neighbour, 8);
              tiles.set(cell, value | 2);
            }

            // west
            if (cell[0] - neighbour[0] === 1) {
              tiles.set(neighbour, 2);
              tiles.set(cell, value | 8);
            }

            // south
            if (neighbour[1] - cell[1] === 1) {
              tiles.set(neighbour, 1);
              tiles.set(cell, value | 4);
            }

            // north
            if (cell[1] - neighbour[1] === 1) {
              tiles.set(neighbour, 4);
              tiles.set(cell, value | 1);
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
    }

    active.current = false;
  }, [active, tiles]);

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
