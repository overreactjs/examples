import { useElement, useRender } from "@overreact/engine";
import { usePlatformGame } from "./PlatformGame";

export const ScoreUI: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const game = usePlatformGame();

  useRender(() => {
    element.setText(game.current.score.toString());
  });

  return <div ref={element.ref} className="absolute top-16 right-8 text-3xl text-white font-[quicksand] font-bold" />;
};