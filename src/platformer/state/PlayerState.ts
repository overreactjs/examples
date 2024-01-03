import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class PlayerState extends ObjectState {
  pos: Property<Position>;
  flip: Property<boolean>;
  animation: Property<string>;

  constructor(pos: Position = [0, 48]) {
    super();
    this.pos = new VariableProperty(pos);
    this.flip = new VariableProperty(false);
    this.animation = new VariableProperty('idle');
  }
}
