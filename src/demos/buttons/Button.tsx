import { useCallback } from "react";
import { useElement, useRender } from "@overreact/engine";
import { useButtonsGame } from "./useButtonsGame";

import "./Button.css";

type ButtonProps = {
  index: number;
  onClick: (index: number) => void;
};

export const Button: React.FC<ButtonProps> = ({ index, onClick }) => {
  const game = useButtonsGame();
  const element = useElement<HTMLButtonElement>();

  useRender(() => {
    element.setData('enabled', index === game.activeButton.current);
  });

  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <div>
      <button ref={element.ref} className="button" onTouchStart={handleClick} onMouseDown={handleClick}>
        <span className="button-shadow" />
        <span className="button-edge" />
        <span className="button-front" />
      </button>
    </div>
  );
};