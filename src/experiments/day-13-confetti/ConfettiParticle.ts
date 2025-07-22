import { BaseParticle, Size, Position, Velocity } from "@overreact/engine";

export class ConfettiParticle extends BaseParticle {
  size: Size;
  pos: Position;
  velocity: Velocity;
  angle: number;
  rotation: number;
  opacity: number;
  container: Size;

  constructor(pos: Position, container: Size) {
    super();
    this.ttl = 5000 * Math.random() + 10000;
    this.size = [(16 * Math.random() + 4), (4 * Math.random() + 4)];
    this.pos = [pos[0], pos[1]];
    this.angle = Math.random() * 360;
    this.rotation = (Math.random() + 0.5) * Math.sign(Math.random() - 0.5) * 5;
    this.opacity = 1;
    this.container = container;

    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.7;
    const n = Math.sqrt(dx * dx + dy * dy);
    this.velocity = [(dx / n) * Math.random() * 15, (dy / n) * Math.random() * 20];
  }

  init(): void {
    this.node.style.position = 'absolute';
    this.node.style.width = `${this.size[0]}px`;
    this.node.style.height = `${this.size[1]}px`;

    const hue = Math.random() * 360;
    const lightness = Math.random() * 20 + 50;
    this.node.style.backgroundColor = `hsl(${hue}deg 100% ${lightness}%)`;

    const x = Math.round(this.pos[0] - this.size[0] / 2);
    const y = Math.round(this.pos[1] - this.size[1] / 2);
    this.node.style.transform = `translate(${x}px, ${y}px) rotate(${this.angle}deg)`;
    this.node.style.display = 'block';
  }

  update(delta: number): void {
    const t = delta / 1000;

    this.velocity[1] += 5 * (this.size[1] / 10) * t;
    this.velocity[0] += 15 * (Math.random() - 0.5) * t;
    
    this.velocity[0] *= 0.98;
    this.velocity[1] *= 0.98;

    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];

    // Bounce particles off the left of the container.
    if (this.pos[0] < 0) {
      this.pos[0] = 0;
      this.velocity[0] *= -0.8;
    }

    // Bounce particles off the right of the container.
    if (this.pos[0] > this.container[0]) {
      this.pos[0] = this.container[0];
      this.velocity[0] *= -0.8;
    }
    // Bounce particles off the top of the container.
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      this.velocity[1] *= -0.8;
    }

    // Kill particles when they reach the bottom of the container.
    if (this.pos[1] > this.container[1] + 20) {
      this.ttl = 0;
    }

    this.angle += this.rotation;

    const x = Math.round(this.pos[0] - this.size[0] / 2);
    const y = Math.round(this.pos[1] - this.size[1] / 2);
    this.node.style.transform = `translate(${x}px, ${y}px) rotate(${this.angle}deg)`;
    this.node.style.opacity = String(this.ttl > 5000 ? 1.0 : this.ttl / 5000);
  }

  destroy(): void {
    this.node.style.display = 'none';
  }
}
