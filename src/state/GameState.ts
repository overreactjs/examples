import { PlayerState } from "./PlayerState";
import { GemState } from "./GemState";
import { GemsState } from "./GemsState";

export class GameState {
  score = 0;
  players = [
    new PlayerState([-144, 48]),
    new PlayerState([144, 48]),
  ];
  gems = new GemsState();

  addScore(delta: number) {
    this.score += delta;
  }

  collectGem(gem: GemState) {
    this.gems.remove(gem);
    this.addScore(100);
  }
}
