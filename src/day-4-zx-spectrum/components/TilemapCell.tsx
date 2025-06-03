import { Tileset, Property, Size, BitmapImage, Prop, useProperty, useCachedDynamicProperty, Position } from "@overreact/engine";

type TilemapCellProps = {
  tile: Prop<number>;
  index: number;
  tileset: Tileset;
  factor: Property<Size>;
};

export const TilemapCell: React.FC<TilemapCellProps> = ({ index, tileset, factor, ...props }) => {
  const { image, cellSize, tileSize, gridSize } = tileset;
  const tilesetCols = Math.floor(image.size[0] / tileSize[0]);

  const tile = useProperty(props.tile);

  const x = (index % gridSize[0]) * cellSize[0];
  const y = Math.floor(index / gridSize[0]) * cellSize[1];

  const offset = useCachedDynamicProperty<number, Position>(tile, (tile) => {
    return [
      tile < 0 ? 0 : (tile % tilesetCols) * tileSize[0],
      tile < 0 ? 0 : Math.floor(tile / tilesetCols) * tileSize[1],
    ];
  });

  const visible = useCachedDynamicProperty<number, boolean>(tile, (tile) => tile >= 0);

  return <BitmapImage pos={[x, y]} offset={offset} image={image} size={cellSize} factor={factor} visible={visible} />;
};
