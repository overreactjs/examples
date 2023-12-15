import { useElement, useRender } from "@engine";
import { usePlatformGame } from "./PlatformGame";

export const ScoreUI: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const game = usePlatformGame();

  useRender(() => {
    element.setText(game.current.score.toString());
  });

  return <div ref={element.ref} className="absolute top-6 right-6 text-3xl text-white font-[quicksand] font-bold" />;
};