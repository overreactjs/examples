import { BaseParticle, Property, Position, Velocity, VariableProperty } from "@overreact/engine";
import sparkImage from "./spark.png";

export class Spark extends BaseParticle {
  pos: Property<Position>;
  velocity: Property<Velocity>;
  scale: Property<number>;
  opacity: Property<number>;

  constructor(pos: Position) {
    super();
    this.ttl = 1000;
    this.pos = new VariableProperty(pos);
    this.scale = new VariableProperty(Math.random() * 4 + 2);
    this.opacity = new VariableProperty(100);
    this.velocity = new VariableProperty([Math.random() * 0.7 - 0.35, Math.random() * 0.7 - 0.35]);
  }

  init() {
    this.node.style.position = 'absolute';
    this.node.style.borderRadius = '100%';
    this.node.style.width = '10px';
    this.node.style.height = '10px';
    this.node.style.marginTop = '-5px';
    this.node.style.marginLeft = '-5px';
    this.node.style.backgroundImage = `url(${sparkImage})`;
    this.node.style.backgroundSize = 'contain';

    const [x, y] = this.pos.current;
    this.node.style.transform = `translate(${x}px, ${y}px) scale(${this.scale.current}, ${this.scale.current})`;
    this.node.style.display = 'block';
  }

  update(delta: number) {
    this.pos.current[0] += this.velocity.current[0] * delta;
    this.pos.current[1] += this.velocity.current[1] * delta;
    this.opacity.current *= 1 - (0.0096 * delta);
    this.scale.current *= 1 + (0.0012 * delta);

    const [x, y] = this.pos.current;
    this.node.style.transform = `translate(${x}px, ${y}px) scale(${this.scale.current}, ${this.scale.current})`;
    this.node.style.opacity = String(this.opacity.current);
  }

  destroy() {
    this.node.style.display = 'none';
  }
}
