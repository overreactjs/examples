import { Position, useDevice, useParticles } from "@overreact/engine";
import { useCallback, useMemo } from "react";
import { ConfettiParticle } from "./ConfettiParticle";

export const useConfetti = () => {
  const particles = useParticles();
  const { size } = useDevice();
  
  const trigger = useCallback((input?: HTMLElement | Position | null) => {
    let pos: Position = [window.innerWidth / 2, window.innerHeight / 2];

    if (input instanceof HTMLElement) {
      const rect = input.getBoundingClientRect();
      pos = [rect.left + rect.width / 2, rect.top + rect.height / 2];
    } else if (input) {
      pos = input;
    }
    
    for (let i = 0; i < 400; i++) {
      particles.attach(new ConfettiParticle(pos, size.current));
    }
  }, [particles, size]);

  return useMemo(() => ({ trigger }), [trigger]);
};
