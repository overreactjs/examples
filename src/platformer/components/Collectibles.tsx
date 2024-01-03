import { useSync } from "@overreact/engine";
import { Gem } from "./Gem";
import { usePlatformGame } from "./PlatformGame";

export const Collectibles: React.FC = () => {
  const game = usePlatformGame();
  const gems = useSync(() => game.current.gems.gems);
  
  return gems?.map((gem) => <Gem key={gem.id} gem={gem} />);
};
