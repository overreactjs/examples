import { BooleanOperations, Circle, Point, Polygon } from "@flatten-js/core";
import { Position, Property, randi, VariableProperty } from "@overreact/engine";
import { createNoise2D } from "simplex-noise";

const SOIL_DARK = { fill: 'url(#soil-dark)', stroke: 'none' };
const SOIL_LIGHT = { fill: 'url(#soil-light)', stroke: 'none' };
const GRASS_DARK = { fill: '#5ABE00', stroke: 'none' };
const GRASS_LIGHT = { fill: '#9AE000', stroke: 'none' };
const BACKGROUND = { fill: 'url(#background)', stroke: 'none' };

export class TerrainState {
  soilDark: Property<Polygon>;
  soilLight: Property<Polygon>;
  grassDark: Property<Polygon>;
  grassLight: Property<Polygon>;
  background: Property<Polygon>;

  constructor() {
    this.soilDark = new VariableProperty(new Polygon([]));
    this.soilLight = new VariableProperty(new Polygon([]));
    this.grassDark = new VariableProperty(new Polygon([]));
    this.grassLight = new VariableProperty(new Polygon([]));
    this.background = new VariableProperty(new Polygon([]));
  }

  get invalidated() {
    return this.soilDark.invalidated || this.soilLight.invalidated
      || this.grassDark.invalidated || this.grassLight.invalidated
      || this.background.invalidated;
  }

  set invalidated(value: boolean) {
    this.soilDark.invalidated = value;
    this.soilLight.invalidated = value;
    this.grassDark.invalidated = value;
    this.grassLight.invalidated = value;
    this.background.invalidated = value;
  }

  contains([x, y]: Position): boolean {
    return this.grassDark.current.contains(new Point(x, y));
  }

  blast([x, y]: Position) {
    const radius = 25 + randi(40);
    const innerBlast = new Polygon(new Circle(new Point(x, y), radius));
    const outerBlast = new Polygon(new Circle(new Point(x, y), radius + 20 + randi(10)));

    this.soilDark.current = BooleanOperations.subtract(this.soilDark.current, innerBlast);
    this.soilLight.current = BooleanOperations.subtract(this.soilLight.current, outerBlast);
    this.grassDark.current = BooleanOperations.subtract(this.grassDark.current, innerBlast);
    this.grassLight.current = BooleanOperations.subtract(this.grassLight.current, outerBlast);
  }

  generate(w: number, h: number) {
    const interval = 10;
    const points = Math.ceil(w / interval) + 1;
    const heights: number[] = [];
    const noise = createNoise2D();

    // Random heights every {interval} pixels, to vary the terrain.
    for (let i = 0; i < points; i++) {
      heights.push((noise(i * interval / 400, 0) + 1) * 50);
    }

    const createTerrain = (ground: number): Polygon => {
      const terrain: [number,number][] = [];

      for (let i = 0; i < heights.length; i++) {
        terrain.push([i * interval, ground - heights[i]]);
      }

      terrain.push([points * interval, h])
      terrain.push([0, h])
      return new Polygon(terrain);
    }

    this.soilDark.current = createTerrain(h / 2 + 20);
    this.soilLight.current = createTerrain(h / 2 + 35);
    this.grassDark.current = createTerrain(h / 2);
    this.grassLight.current = createTerrain(h / 2);
    this.background.current = createTerrain(h / 2);
  }

  svg() {
    return ''
      + this.background.current.svg(BACKGROUND)
      + this.grassDark.current.svg(GRASS_DARK)
      + this.grassLight.current.svg(GRASS_LIGHT)
      + this.soilDark.current.svg(SOIL_DARK)
      + this.soilLight.current.svg(SOIL_LIGHT);
  }
}