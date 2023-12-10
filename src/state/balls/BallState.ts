import { Position } from "@engine";
import { ObjectState, StateProp } from "../ObjectState";

export class BallState extends ObjectState {
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
