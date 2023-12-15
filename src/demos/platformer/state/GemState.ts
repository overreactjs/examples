import { ObjectState, Position, StateProp } from "@engine";

export class GemState extends ObjectState {
  pos: StateProp<Position>;

  constructor(pos: Position) {
    super();
    this.pos = new StateProp(pos);
  }
}
