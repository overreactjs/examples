import { ObjectState, Property, VariableProperty } from "@overreact/engine";
import { CardType } from "./types";

export class CardState extends ObjectState {
  type: Property<CardType>;
  flipped: Property<boolean>;
  found: Property<boolean>;
  shake: Property<boolean>;

  constructor(type: CardType) {
    super();
    this.type = new VariableProperty(type);
    this.flipped = new VariableProperty(false);
    this.found = new VariableProperty(false);
    this.shake = new VariableProperty(false);
  }
}
