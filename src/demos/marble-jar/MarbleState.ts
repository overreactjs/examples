import { ObjectState, Position, StateProp } from "@engine";

export class MarbleState extends ObjectState {
  pos: StateProp<Position>;
  radius: StateProp<number>;
  color: StateProp<string>;

  constructor(pos: Position, radius: number, color: string) {
    super();
    this.pos = new StateProp(pos);
    this.radius = new StateProp(radius);
    this.color = new StateProp(color);
  }
}
