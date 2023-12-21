import { useState, useCallback, useRef } from "react";
import { useAudio, useHaptics, useUpdate } from "@engine";
import { sounds } from "@assets";
import { Button } from "./Button";
import { Timer } from "./Timer";

const SOUNDS = [sounds.switch005, sounds.switch006, sounds.switch007];

export const Buttons: React.FC = () => {
  const audio = useAudio();
  const haptics = useHaptics();
  
  const started = useRef(false);
  const time = useRef(0);
  const score = useRef(0);
  const [index, setIndex] = useState<number | null>(Math.floor(Math.random() * 24));

  /**
   * Add a point to the player's score, and start the game if it's not already.
   */
  const addPoint = useCallback(() => {
    score.current++;
    started.current = true;
  }, []);

  /**
   * Activate a different button at random. This is a little more complex than simply picking an
   * index at random, because we always want to activate a different button.
   */
  const activateRandomButton = useCallback(() => {
    setIndex((index) => ((index || 0) + Math.floor(Math.random() * 18) + 1) % 20);
  }, []);

  /**
   * Play one of the three random clicking sounds. Randomizing it slightly makes it feel less
   * monotonous.
   */
  const playRandomSound = useCallback(() => {
    audio.play(SOUNDS[Math.floor(Math.random() * SOUNDS.length)]);
  }, [audio]);

  /**
   * When the active button is clicked, activate a different button at random, and award a point.
   */
  const handleButtonClick = useCallback((value: number) => {
    if (value === index) {
      addPoint();
      activateRandomButton();
      playRandomSound();
      haptics.notification('success');
    }
  }, [activateRandomButton, addPoint, haptics, index, playRandomSound]);

  /**
   * Update the timer, once the game has begun.
   */
  useUpdate((delta) => {
    if (started.current) {
      time.current += delta;
    }
  });

  /**
   * Stop the timer when it reaches thirty seconds, and disable all buttons.
   */
  useUpdate(() => {
    if (time.current >= 30000) {
      started.current = false;
      setIndex(null);
    }
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-full flex flex-col items-center gap-8">
        <Timer time={time} score={score} />
        <div className="w-full grid grid-cols-4 gap-3 gap-y-5 p-4 box-border">
          <Button onClick={() => handleButtonClick(0)} disabled={index !== 0} />
          <Button onClick={() => handleButtonClick(1)} disabled={index !== 1} />
          <Button onClick={() => handleButtonClick(2)} disabled={index !== 2} />
          <Button onClick={() => handleButtonClick(3)} disabled={index !== 3} />
          <Button onClick={() => handleButtonClick(4)} disabled={index !== 4} />
          <Button onClick={() => handleButtonClick(5)} disabled={index !== 5} />
          <Button onClick={() => handleButtonClick(6)} disabled={index !== 6} />
          <Button onClick={() => handleButtonClick(7)} disabled={index !== 7} />
          <Button onClick={() => handleButtonClick(8)} disabled={index !== 8} />
          <Button onClick={() => handleButtonClick(9)} disabled={index !== 9} />
          <Button onClick={() => handleButtonClick(10)} disabled={index !== 10} />
          <Button onClick={() => handleButtonClick(11)} disabled={index !== 11} />
          <Button onClick={() => handleButtonClick(12)} disabled={index !== 12} />
          <Button onClick={() => handleButtonClick(13)} disabled={index !== 13} />
          <Button onClick={() => handleButtonClick(14)} disabled={index !== 14} />
          <Button onClick={() => handleButtonClick(15)} disabled={index !== 15} />
          <Button onClick={() => handleButtonClick(16)} disabled={index !== 16} />
          <Button onClick={() => handleButtonClick(17)} disabled={index !== 17} />
          <Button onClick={() => handleButtonClick(18)} disabled={index !== 18} />
          <Button onClick={() => handleButtonClick(19)} disabled={index !== 19} />
        </div>
      </div>
    </div>
  );
};