import { Device, Engine } from "@overreact/engine";
import { useLayoutEffect, useRef } from "react";

export const AnimalsDemo = () => {
  return (
    <Engine>
      <Device mode="mobile">
        <div className="h-full grid place-items-center font-[quicksand] font-bold text-xl">
          <AnimalsGame />
        </div>
      </Device>
    </Engine>
  );
};

const AnimalsGame = () => {
  // const voices = useRef<SpeechSynthesisVoice[]>([]);

  const onClick = () => {
    const utterance = new SpeechSynthesisUtterance("grizzly bear");
    // utterance.voice = voices.current[0];
    speechSynthesis.speak(utterance);
  }

  // useLayoutEffect(() => {
  //   voices.current = speechSynthesis.getVoices()
  //     .filter((voice) => voice.lang === 'en-GB' && voice.localService);

  //   console.log(voices.current);
  // }, [])

  return (
    <button onClick={onClick}>Click me!</button>
  );
};