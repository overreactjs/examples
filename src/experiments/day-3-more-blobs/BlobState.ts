import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class BlobState extends ObjectState {
  pos: Property<Position>;
  radius: Property<number>;

  constructor(pos: Position, radius: number, ) {
    super();
    this.pos = new VariableProperty(pos);
    this.radius = new VariableProperty(radius);
  }
}
