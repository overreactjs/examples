import { Position, Size, useTiles, useProperty, randi, useUpdate } from "@overreact/engine";
import { useState, useCallback, useMemo } from "react";
import { EAST, NORTH, SOUTH, TILESET, WEST } from "./constants";

/**
 * Returns the tiles for a maze, along with a 'generate' function to trigger random generation.
 */
export const useMaze = () => {
  const [walls, setWalls] = useState<[Position, Size][]>([]);
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
    
    // Whilst there are some cells in the 'candidates' list, take one and built out a path from
    // it until it get stuck in a cover, or it reaches the maximum permitted chain length, at which
    // point stop processing that candidate and remove it from the list.
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

            // east
            if (neighbour[0] - cell[0] === 1) {
              tiles.set(neighbour, WEST);
              tiles.set(cell, value | EAST);
            }

            // west
            if (cell[0] - neighbour[0] === 1) {
              tiles.set(neighbour, EAST);
              tiles.set(cell, value | WEST);
            }

            // south
            if (neighbour[1] - cell[1] === 1) {
              tiles.set(neighbour, NORTH);
              tiles.set(cell, value | SOUTH);
            }

            // north
            if (cell[1] - neighbour[1] === 1) {
              tiles.set(neighbour, SOUTH);
              tiles.set(cell, value | NORTH);
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

    // Open up some of the paths.
    // for (let i = 0; i < 1; i++) {
    //   const x = randi(10) + 1;
    //   const y = randi(10) + 1;

    //   tiles.set([x, y], 15);

    //   const east: Position = [x + 1, y];
    //   tiles.set(east, (tiles.get(east) || 15) | WEST);

    //   const west: Position = [x - 1, y];
    //   tiles.set(west, (tiles.get(west) || 15) | EAST);

    //   const north: Position = [x, y - 1];
    //   tiles.set(north, (tiles.get(north) || 15) | SOUTH);

    //   const south: Position = [x, y + 1];
    //   tiles.set(south, (tiles.get(south) || 15) | NORTH);
    // }

    // The full maze has been determined, so now we'll walk over the cells row-by-row and
    // column-by-column, to build up a list of all the wall that will be used to place physics
    // boxes that the balls will bounce off.
    const walls: [Position, Size][] = [];
    const [cw, ch] = TILESET.cellSize;

    // Row by row, to determine horizontal walls.
    for (let y = 0; y < tiles.size[1]; y++) {
      for (let x = 0; x < tiles.size[0]; x++) {
        const tile = tiles.get([x, y]);

        if (tile && !(tile & NORTH)) {
          walls.push([[(x + 0.5) * cw, y * ch], [cw, 4]]);
        }

        if (y === tiles.size[1] - 1) {
          walls.push([[(x + 0.5) * cw, (y + 1) * ch], [cw, 4]]);
        }
      }
    }

    // Column by column, to determine vertical walls.
    for (let x = 0; x < tiles.size[0]; x++) {
      for (let y = 0; y < tiles.size[1]; y++) {
        const tile = tiles.get([x, y]);

        if (tile && !(tile & WEST)) {
          walls.push([[x * cw, ( y + 0.5) * ch], [4, ch]]);
        }

        if (x === tiles.size[0] - 1) {
          walls.push([[(x + 1) * cw, (y + 0.5) * ch], [4, ch]]);
        }
      }
    }

    setWalls(walls);
  }, [active, tiles]);

  useUpdate(() => {
    if (!active.current) {
      generate();
    }
  });

  return useMemo(() => ({ tiles, walls }), [tiles, walls]);
};
