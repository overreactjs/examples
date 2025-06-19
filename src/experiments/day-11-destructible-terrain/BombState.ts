import { ObjectState, Property, Position, Velocity, VariableProperty } from "@overreact/engine";

export class BombState extends ObjectState {
  pos: Property<Position>;
  velocity: Property<Velocity>;

  constructor(pos: Position) {
    super();
    this.pos = new VariableProperty(pos);
    this.velocity = new VariableProperty([0, 0]);
  }
}
