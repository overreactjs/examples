import { Property, VariableProperty } from "@overreact/engine";

export class ButtonsGameState {
  activeButton: Property<number | null>;
  started: Property<boolean>;
  time: Property<number>;
  score: Property<number>;

  constructor() {
    this.activeButton = new VariableProperty(Math.floor(Math.random() * 20));
    this.started = new VariableProperty(false);
    this.time = new VariableProperty(0);
    this.score = new VariableProperty(0);
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
