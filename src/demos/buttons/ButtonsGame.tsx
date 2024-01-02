import { useState, useCallback } from "react";
import { useHaptics } from "@overreact/capacitor";
import { useAudio, useUpdate } from "@overreact/engine";
import { sounds } from "./assets";
import { Button } from "./Button";
import { Timer } from "./Timer";
import React from "react";
import { ButtonsGameState } from "./ButtonsGameState";
import { ButtonsGameContext } from "./useButtonsGame";

export const ButtonsGame: React.FC = () => {
  const audio = useAudio();
  const haptics = useHaptics();
  const [game] = useState(new ButtonsGameState());
  
  /**
   * Play one of the three random clicking sounds. Randomizing it slightly makes it feel less
   * monotonous.
   */
  const playRandomSound = useCallback(() => {
    audio.play(sounds[Math.floor(Math.random() * sounds.length)]);
  }, [audio]);

  /**
   * When the active button is clicked, activate a different button at random, and award a point.
   */
  const handleButtonClick = useCallback((value: number) => {
    if (value === game.activeButton.current) {
      game.addPoint();
      game.randomize();
      haptics.notification('success');
      playRandomSound();
    }
  }, [game, haptics, playRandomSound]);

  /**
   * Update the timer, once the game has begun.
   */
  useUpdate((delta) => {
    if (game.started.current) {
      game.time.current += delta;
    }
  });

  /**
   * Stop the timer when it reaches thirty seconds, and disable all buttons.
   */
  useUpdate(() => {
    if (game.time.current >= 30000) {
      game.started.current = false;
      game.clear();
    }
  });

  return (
    <ButtonsGameContext.Provider value={game}>
      <div className="w-full h-full grid place-items-center">
        <div className="w-full flex flex-col items-center gap-8">
          <Timer />
          <div className="w-full grid grid-cols-4 gap-3 gap-y-5 p-4 box-border">
            <Button onClick={handleButtonClick} index={0} />
            <Button onClick={handleButtonClick} index={1} />
            <Button onClick={handleButtonClick} index={2} />
            <Button onClick={handleButtonClick} index={3} />
            <Button onClick={handleButtonClick} index={4} />
            <Button onClick={handleButtonClick} index={5} />
            <Button onClick={handleButtonClick} index={6} />
            <Button onClick={handleButtonClick} index={7} />
            <Button onClick={handleButtonClick} index={8} />
            <Button onClick={handleButtonClick} index={9} />
            <Button onClick={handleButtonClick} index={10} />
            <Button onClick={handleButtonClick} index={11} />
            <Button onClick={handleButtonClick} index={12} />
            <Button onClick={handleButtonClick} index={13} />
            <Button onClick={handleButtonClick} index={14} />
            <Button onClick={handleButtonClick} index={15} />
            <Button onClick={handleButtonClick} index={16} />
            <Button onClick={handleButtonClick} index={17} />
            <Button onClick={handleButtonClick} index={18} />
            <Button onClick={handleButtonClick} index={19} />
          </div>
        </div>
      </div>
    </ButtonsGameContext.Provider>
  );
};