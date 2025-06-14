import { useMemo } from "react";
import { useFixedUpdate } from "@overreact/engine";
import { ATTRIBUTES_TILESET } from "../assets";
import { Tilemap, Tiles } from "./Tilemap"

type ZXAttributesProps = {
  bright?: boolean;
}

export const ZXAttributes: React.FC<ZXAttributesProps> = ({ bright = false}) => {
  const tiles: Tiles = useMemo(() => {
    const result = new Tiles(32, 25);

    for (let i = 0; i < 768; i++) {
      result.values[i].current = Math.floor(Math.random() * 16);
    }

    return result;
  }, []);

  useFixedUpdate(60, () => {
    for (let i = 0; i < 40; i++) {
      const index = Math.floor(Math.random() * 768);
      tiles.values[index].current = Math.floor(Math.random() * 4) + (bright ? 4 : 0);
    }
  });

  return (
    <Tilemap tileset={ATTRIBUTES_TILESET} tiles={tiles} />
  );
};
