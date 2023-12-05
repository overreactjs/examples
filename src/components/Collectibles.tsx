import { useSync } from "@engine";
import { Gem } from "./Gem";
import { useGame } from "./Game";

export const Collectibles: React.FC = () => {
  const game = useGame();
  const gems = useSync(() => game.current.gems.gems);
  
  return gems?.map((gem) => <Gem key={gem.id} gem={gem} />);
};
