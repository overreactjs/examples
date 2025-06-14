import { useEffect, useRef } from "react";
import { Device, Engine, randi, useElement } from "@overreact/engine";
import "./styles.css";

export const Day7Demo = () => (
  <Engine>
    <Device bg="white" showFPS>
      <div className="w-full h-full grid place-items-center bg-[radial-gradient(#f8f5f2,#fff)]">
        <div className="container w-auto">
          <Dice />
        </div>
      </div>
    </Device>
  </Engine>
);

const Dice = () => {
  const dice = useElement();
  const index = useRef(0);

  const sides: [x: number, y: number, z: number][] = [
    [20, 5, 25],
    [-70, -15, 10],
    [25, 80, -10],
    [20, -80, -5],
    [110, -10, 15],
    [200, 10, -15],
  ];

  const onClick = () => {
    const side = randi(6);
    const rotation = sides[side];

    index.current += 1;
    const x = rotation[0] + index.current * 720;
    const y = rotation[1] + index.current * 360;
    const z = rotation[2];

    dice.setStyle('transform', `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`);
  };
  
  useEffect(() => {
    const side = randi(6);
    const [x, y, z] = sides[side];
    
    dice.setData('immediate', 'true');
    dice.setStyle('transform', `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`);
    setTimeout(() => dice.setData('immediate', 'false'));
  });

  return (
    <div className="dice" ref={dice.ref} onClick={onClick}>
      <div className="face front" />
      <div className="face back" />
      <div className="face top" />
      <div className="face bottom" />
      <div className="face left" />
      <div className="face right" />
      <div className="inner a" />
      <div className="inner b" />
      <div className="inner c" />
      <div className="inner d" />
      <div className="inner e" />
      <div className="inner f" />
    </div>
  );
};
