import { useElement, useLogMount, useRender } from "@engine";
import { useGame } from "./Game";

export const ScoreUI: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const game = useGame();

  useLogMount('ScoreUI');

  useRender(() => {
    element.setText(`Score: ${game.current.score}`);
  });

  return <div ref={element.ref} className="absolute top-8 left-8 text-3xl text-white" />;
};