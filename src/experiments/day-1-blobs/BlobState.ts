import { ObjectState, Position, Property, VariableProperty } from "@overreact/engine";

export class BlobState extends ObjectState {
  pos: Property<Position>;
  radius: Property<number>;
  color: Property<string>;

  constructor(pos: Position, radius: number, color: string) {
    super();
    this.pos = new VariableProperty(pos);
    this.radius = new VariableProperty(radius);
    this.color = new VariableProperty(color);
  }
}
