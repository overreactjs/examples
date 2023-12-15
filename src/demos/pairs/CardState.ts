import { ObjectState, StateProp } from "@engine";
import { CardType } from "./types";

export class CardState extends ObjectState {
  type: StateProp<CardType>;
  flipped: StateProp<boolean>;
  found: StateProp<boolean>;
  shake: StateProp<boolean>;

  constructor(type: CardType) {
    super();
    this.type = new StateProp(type);
    this.flipped = new StateProp(false);
    this.found = new StateProp(false);
    this.shake = new StateProp(false);
  }
}
