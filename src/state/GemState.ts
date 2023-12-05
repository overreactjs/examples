import { Position } from "@engine";
import { ObjectState, StateProp } from "./ObjectState";

export class GemState extends ObjectState {
  pos: StateProp<Position>;

  constructor(pos: Position) {
    super();
    this.pos = new StateProp(pos);
  }
}
