import { GemState } from "./GemState";

export class GemsState {
  gems: GemState[] = [
    new GemState([-552, -272]),
    new GemState([-480, -272]),
    new GemState([-408, -272]),
    new GemState([-336, -272]),
    new GemState([-336, -272]),
    new GemState([-264, -272]),
    new GemState([552, -272]),
    new GemState([480, -272]),
    new GemState([408, -272]),
    new GemState([336, -272]),
    new GemState([336, -272]),
    new GemState([264, -272]),

    new GemState([-552, -128]),
    new GemState([-480, -128]),
    new GemState([-408, -128]),
    new GemState([552, -128]),
    new GemState([480, -128]),
    new GemState([408, -128]),

    new GemState([-552, 16]),
    new GemState([-480, 16]),
    new GemState([-408, 16]),
    new GemState([552, 16]),
    new GemState([480, 16]),
    new GemState([408, 16]),

    new GemState([-336, 160]),
    new GemState([-264, 160]),
    new GemState([-72, 160]),
    new GemState([0, 160]),
    new GemState([72, 160]),
    new GemState([336, 160]),
    new GemState([264, 160]),

    new GemState([-180, 304]),
    new GemState([-108, 304]),
    new GemState([-36, 304]),
    new GemState([36, 304]),
    new GemState([108, 304]),
    new GemState([180, 304]),
  ];

  remove(gem: GemState) {
    this.gems = this.gems.filter((entry) => entry !== gem);
  }
}