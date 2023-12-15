import { Device, Engine, Prop, useElement, useMouse, useProperty, useRender, useShaker, useSync, useUpdate } from "@engine";
import { CONFIG } from "../constants";
import { useCardGame } from "../components/CardGame";
import { CardState } from "../state";
import { Close } from "../components";

export const CardsDemo = () => {
  return (
    <Engine>
      <Device bg="#223344">
        <Cards />
        <Close />
      </Device>
    </Engine>
  );
};

const Cards: React.FC = () => {
  const game = useCardGame();
  const cards = useSync(() => game.current.cards);

  return (
    <div className="w-full h-full grid grid-rows-5 grid-cols-4 gap-3 p-4 py-24 box-border">
      {(cards || []).map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

type CardProps = {
  card: Prop<CardState>;
};

const Card: React.FC<CardProps> = (props) => {
  const element = useElement();
  const front = useElement();
  const back = useElement();
  const mouse = useMouse();
  const shaker = useShaker({ strength: 10, phase: 20 });

  const game = useCardGame();
  const card = useProperty(props.card);
  const angle = useProperty(0);

  useUpdate(() => {
    if (mouse.isPressed(0) && mouse.isTarget(element.ref)) {
      game.current.flipCard(card.current);
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
    }
  })

  useRender(() => {
    const { type } = card.current;
    const { color, image } = CONFIG[type.current];
    
    element.setStyle('transform', `perspective(400px) rotateY(${angle.current}deg)`);
    element.setStyle('transformStyle', 'preserve-3d');

    front.setStyle('backgroundColor', color);
    front.setStyle('backgroundImage', `url(${image})`);
    front.setStyle('backfaceVisibility', 'hidden');
    front.setStyle('transform', `rotateY(180deg)`);
    
    back.setStyle('backfaceVisibility', 'hidden');
  })

  return (
    <div ref={shaker.ref} className="w-full h-full">
      <div ref={element.ref} className="w-full h-full relative">
        <div ref={front.ref} className="absolute top-0 left-0 w-full h-full rounded-xl bg-[90%_auto] bg-center bg-no-repeat" />
        <div ref={back.ref} className="absolute top-0 left-0 w-full h-full rounded-xl bg-slate-100 border-4 border-slate-300 grid place-items-center">
          <div className="text-6xl font-bold font-[quicksand] text-slate-600">?</div>
        </div>
      </div>
    </div>
  );
};
