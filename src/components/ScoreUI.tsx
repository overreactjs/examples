import { useElement, useLogMount, useRender } from "@engine";
import { usePlatformGame } from "./PlatformGame";

export const ScoreUI: React.FC = () => {
  const element = useElement<HTMLDivElement>();
  const game = usePlatformGame();

  useLogMount('ScoreUI');

  useRender(() => {
    element.setText(`Score: ${game.current.score}`);
  });

  return <div ref={element.ref} className="absolute top-8 left-8 text-3xl text-white" />;
};