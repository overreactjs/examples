import { BaseParticle, Device, Engine, Node, ParticleEngine, Particles, Position, Prop, Property, VariableProperty, Velocity, Viewport, World, useFixedUpdate, useParticles, usePointer, useProperty, useUpdate } from "@overreact/engine";

export const ParticlesDemo = () => {
  const timeScale = useProperty(1);

  return (
    <Engine>
      <Node timeScale={timeScale}>
        <ParticleEngine>
          <Device bg="#001122" showFPS>
            <Viewport>
              <World>  
                <ParticleGenerator timeScale={timeScale} />
              </World>
            </Viewport>
          </Device>
        </ParticleEngine>
      </Node>
    </Engine>
  );
};

type ParticleGeneratorProps = {
  timeScale: Prop<number>;
};

const ParticleGenerator: React.FC<ParticleGeneratorProps> = (props) => {
  const particles = useParticles();
  const pointer = usePointer();
  const hue = useProperty(180);
  const timeScale = useProperty(props.timeScale);
  
  useFixedUpdate(320, () => {
    particles.attach(new Particle(hue.current));
  });

  useUpdate((delta) => {
    hue.current += 0.024 * delta * timeScale.current;
    timeScale.current = pointer.isDown() ? 0.2 : 1.0;
  });

  return <Particles />;
};

class Particle extends BaseParticle {
  hue: number;
  pos: Property<Position>;
  velocity: Property<Velocity>;
  scale: Property<number>;
  opacity: Property<number>;

  constructor(hue: number) {
    super();
    this.ttl = 1000;
    this.hue = hue;
    this.pos = new VariableProperty([Math.random() * 20 - 10, 450]);
    this.scale = new VariableProperty(Math.random() * 2.5 + 1);
    this.opacity = new VariableProperty(100);
    this.velocity = new VariableProperty([Math.random() * 0.7 - 0.35, -Math.random() - 1.0]);
  }

  init() {
    this.node.style.position = 'absolute';
    this.node.style.borderRadius = '100%';
    this.node.style.width = '10px';
    this.node.style.height = '10px';
    this.node.style.marginTop = '-5px';
    this.node.style.marginLeft = '-5px';
    this.node.style.backgroundColor = `hsl(${Math.random() * 40 + this.hue}deg 100% 50%)`;

    const [x, y] = this.pos.current;
    this.node.style.transform = `translate(${x}px, ${y}px) scale(${this.scale.current}, ${this.scale.current})`;
    this.node.style.display = 'block';
  }

  update(delta: number) {
    this.pos.current[0] += this.velocity.current[0] * delta;
    this.pos.current[1] += this.velocity.current[1] * delta;
    this.velocity.current[0] *= 1 - (0.0012 * delta);
    this.velocity.current[1] += 0.0024 * delta;
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

