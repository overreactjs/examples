import { Box, Position, Prop, Size, Tileset, usePosition, useProperty, VariableProperty } from "@overreact/engine";
import { TilemapCell } from "./TilemapCell";

type TilemapProps = {
  pos?: Prop<Position>;
  tileset: Tileset;
  tiles: Tiles;
  scale?: Prop<number>;
}

export const Tilemap: React.FC<TilemapProps> = ({ tileset, tiles, ...props }) => {
  const { cellSize, tileSize, gridSize } = tileset;

  const pos = usePosition(props.pos);
  const size = useProperty<Size>([gridSize[0] * cellSize[0], gridSize[1] * cellSize[0]]);
  const factor = useProperty<Size>([cellSize[0] / tileSize[0], cellSize[1] / tileSize[1]]);
  
  return (
    <Box pos={pos} size={size}>
      {tiles.values.map((tile, index) => (
        <TilemapCell key={index} tile={tile} index={index} tileset={tileset} factor={factor} />
      ))}
    </Box>
  );
};

/**
 * 
 */

export class Tiles {

  width: number;
  height: number;
  values: VariableProperty<number>[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.values = new Array(width * height);

    const size = width * height;
    for (let i = 0; i < size; i++) {
      this.values[i] = new VariableProperty(-1);
      // this.values[i].listen(this.onChange);
    }
  }
}