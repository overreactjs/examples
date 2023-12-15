import { ObjectState, Position, StateProp } from "@engine";

export class PlayerState extends ObjectState {
  pos: StateProp<Position>;
  flip: StateProp<boolean>;
  animation: StateProp<string>;

  constructor(pos: Position = [0, 48]) {
    super();
    this.pos = new StateProp(pos);
    this.flip = new StateProp(false);
    this.animation = new StateProp('idle');
  }
}
