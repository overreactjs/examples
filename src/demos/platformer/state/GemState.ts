import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class GemState extends ObjectState {
  pos: Property<Position>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
  }
}
