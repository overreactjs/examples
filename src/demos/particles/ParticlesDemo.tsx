import { Device, Engine, Node, Particle, ParticleGenerator, Viewport, World, useProperty, useTouch, useUpdate } from "@overreact/engine";

export const ParticlesDemo = () => {
  return (
    <Engine>
      <Device bg="#001122" mode="mobile" showFPS>
        <Viewport>
          <World>
            <Particles />   
          </World>
        </Viewport>
      </Device>
    </Engine>
  );
};

const Particles: React.FC = () => {
  const touch = useTouch();

  const hue = useProperty(180);
  const timeScale = useProperty(1);

  const onInit = ({ age, pos, velocity, opacity, scale, node }: Particle) => {
    age.current = 0;
    pos.current[0] = Math.random() * 20 - 10;
    pos.current[1] = 450;
    velocity.current = [Math.random() * 0.7 - 0.35, -Math.random() - 1.0]
    scale.current = Math.random() * 2.5 + 1;
    opacity.current = 100;

    node.style.position = 'absolute';
    node.style.borderRadius = '100%';
    node.style.width = '10px';
    node.style.height = '10px';
    node.style.marginTop = '-5px';
    node.style.marginLeft = '-5px';
    node.style.backgroundColor = `hsl(${Math.random() * 40 + hue.current}deg 100% 50%)`;
  };

  const onUpdate = ({ age, pos, velocity, opacity, scale, node }: Particle, delta: number) => {
    age.current += delta;
    pos.current[0] += velocity.current[0] * delta;
    pos.current[1] += velocity.current[1] * delta;
    velocity.current[0] *= 1 - (0.0012 * delta); // 0.99 
    velocity.current[1] += 0.0024 * delta; // 0.02
    opacity.current *= 1 - (0.0096 * delta); // 0.92
    scale.current *= 1 + (0.0012 * delta); // 1.01

    node.attributeStyleMap.set('opacity', CSS.number(opacity.current));
    node.attributeStyleMap.set('transform', new CSSTransformValue([
      new CSSTranslate(CSS.px(pos.current[0]), CSS.px(pos.current[1])),
      new CSSScale(CSS.number(scale.current), CSS.number(scale.current)),
    ]));
  };

  useUpdate((delta) => {
    hue.current += 0.024 * delta * timeScale.current; // 0.02
    timeScale.current = touch.isDown() ? 0.2 : 1.0;
  });

  return (
    <Node timeScale={timeScale}>
      <ParticleGenerator onInit={onInit} onUpdate={onUpdate} rate={240} lifespan={1000} />
    </Node>
  );
};


