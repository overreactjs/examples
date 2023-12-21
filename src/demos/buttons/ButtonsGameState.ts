import { StateProp } from "@engine";

export class ButtonsGameState {
  activeButton: StateProp<number | null>;
  started: StateProp<boolean>;
  time: StateProp<number>;
  score: StateProp<number>;

  constructor() {
    this.activeButton = new StateProp(Math.floor(Math.random() * 24));
    this.started = new StateProp(false);
    this.time = new StateProp(0);
    this.score = new StateProp(0);
  }

  addPoint() {
    this.score.current++;
    this.started.current = true;
  }

  clear() {
    this.activeButton.current = null;
  }

  randomize() {
    this.activeButton.current = ((this.activeButton.current || 0) + Math.floor(Math.random() * 18) + 1) % 20;
  }
}
