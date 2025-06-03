import { useSync } from "@overreact/engine";
import { usePairsGame } from "./PairsGame";
import { Card } from "./Card";

export const Cards: React.FC = () => {
  const game = usePairsGame();
  const cards = useSync(() => game.current?.cards);

  return (
    <div className="w-full h-full max-w-[480px] max-h-[920px] grid grid-rows-5 grid-cols-4 gap-3 p-4 py-24 box-border">
      {(cards || []).map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
