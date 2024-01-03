import { Prop, useElement, usePointer, useProperty, useRender, useShaker, useUpdate } from "@overreact/engine";
import { useHaptics } from "@overreact/capacitor";
import { CardState } from "./CardState";
import { usePairsGame } from "./PairsGame";
import { CONFIG } from "./constants";

type CardProps = {
  card: Prop<CardState>;
};

export const Card: React.FC<CardProps> = (props) => {
  const element = useElement();
  const front = useElement();
  const back = useElement();
  const pointer = usePointer();
  const shaker = useShaker({ strength: 10, phase: 20 });
  const haptics = useHaptics();

  const game = usePairsGame();
  const card = useProperty(props.card);
  const angle = useProperty(0);

  useUpdate(() => {
    if (pointer.isPressed() && pointer.isTarget(element.ref)) {
      game.current?.flipCard(card.current);
    }
  });

  useUpdate((delta) => {
    const { flipped, shake } = card.current;

    if (angle.current > 0 && !flipped.current) {
      angle.current = Math.max(angle.current - delta / 2, 0);
    } else if (angle.current < 180 && flipped.current) {
      angle.current = Math.min(angle.current + delta / 2, 180);
    }

    if (shake.current) {
      shake.current = false;
      shaker.shake();
      haptics.notification('error');
    }
  })

  useRender(() => {
    if (angle.invalidated) {
      element.setStyle('transform', `perspective(400px) rotateY(${angle.current}deg)`);
      angle.invalidated = false;
    }

    if (card.invalidated) {
      const { type } = card.current;
      const { color, image } = CONFIG[type.current];

      front.setStyle('background-color', color);
      front.setStyle('background-image', `url(${image})`);
      front.setStyle('backface-visibility', 'hidden');
      front.setStyle('transform', `rotateY(180deg)`);
   
      back.setStyle('backface-visibility', 'hidden');

      card.invalidated = false;
    }
  });

  return (
    <div ref={shaker.ref} className="w-full h-full">
      <div ref={element.ref} className="w-full h-full relative" style={{ 'transformStyle': 'preserve-3d' }}>
        <div ref={front.ref} className="absolute top-0 left-0 w-full h-full rounded-xl bg-[90%_auto] bg-center bg-no-repeat" />
        <div ref={back.ref} className="absolute top-0 left-0 w-full h-full rounded-xl bg-slate-100 border-4 border-slate-300 grid place-items-center">
          <div className="text-6xl font-bold font-[quicksand] text-slate-600">?</div>
        </div>
      </div>
    </div>
  );
};
