import { useCallback, useState } from "react";
import { Device, Engine, useAudio, useHaptics } from "@engine";

import "./styles.css";

import { sounds } from "@assets";

const SOUNDS = [sounds.switch005, sounds.switch006, sounds.switch007];

export const ButtonsDemo = () => {
  return (
    <Engine>
      <Device>
        <div className="w-full h-full grid place-items-center">
          <Buttons />
        </div>
      </Device>
    </Engine>
  );
};

const Buttons: React.FC = () => {
  const audio = useAudio();
  const haptics = useHaptics();
  const [index, setIndex] = useState(0);

  const onClick = useCallback((value: number) => {
    if (value === index) {
      setIndex((index + Math.floor(Math.random() * 18) + 1) % 20);
      audio.play(SOUNDS[Math.floor(Math.random() * SOUNDS.length)]);
      haptics.notification('success');
    }
  }, [index]);

  return (
    <div className="w-full grid grid-cols-4 gap-3 gap-y-5 p-4 box-border">
      <Button onClick={() => onClick(0)} disabled={index !== 0} />
      <Button onClick={() => onClick(1)} disabled={index !== 1} />
      <Button onClick={() => onClick(2)} disabled={index !== 2} />
      <Button onClick={() => onClick(3)} disabled={index !== 3} />
      <Button onClick={() => onClick(4)} disabled={index !== 4} />
      <Button onClick={() => onClick(5)} disabled={index !== 5} />
      <Button onClick={() => onClick(6)} disabled={index !== 6} />
      <Button onClick={() => onClick(7)} disabled={index !== 7} />
      <Button onClick={() => onClick(8)} disabled={index !== 8} />
      <Button onClick={() => onClick(9)} disabled={index !== 9} />
      <Button onClick={() => onClick(10)} disabled={index !== 10} />
      <Button onClick={() => onClick(11)} disabled={index !== 11} />
      <Button onClick={() => onClick(12)} disabled={index !== 12} />
      <Button onClick={() => onClick(13)} disabled={index !== 13} />
      <Button onClick={() => onClick(14)} disabled={index !== 14} />
      <Button onClick={() => onClick(15)} disabled={index !== 15} />
      <Button onClick={() => onClick(16)} disabled={index !== 16} />
      <Button onClick={() => onClick(17)} disabled={index !== 17} />
      <Button onClick={() => onClick(18)} disabled={index !== 18} />
      <Button onClick={() => onClick(19)} disabled={index !== 19} />
    </div>
  )
}

type ButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ disabled, onClick }) => {
  return (
    <div>
      <button className={`button ${!disabled && 'button-enabled'}`} onTouchStart={onClick}>
        <span className="button-shadow" />
        <span className="button-edge" />
        <span className="button-front" />
      </button>
    </div>
  );
};
