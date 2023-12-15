import { Device, Engine, useElement, useOrientation, useRender } from "@engine";
import { Close } from "@components";

export const OrientationDemo = () => {
  return (
    <Engine>
      <Device allowShake allowTilt>
        <OrientationGame />
        <Close />
      </Device>
    </Engine>
  );
};

const OrientationGame: React.FC = () => {
  const alpha = useElement();
  const beta = useElement();
  const gamma = useElement();
  const orientation = useOrientation();

  useRender(() => {
    alpha.setText(orientation.alpha.current.toFixed(0));
    beta.setText(orientation.beta.current.toFixed(0));
    gamma.setText(orientation.gamma.current.toFixed(0));
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-16 font-[quicksand] font-bold text-6xl">
        <div ref={alpha.ref} className="text-red-600" />
        <div ref={beta.ref} className="text-green-600" />
        <div ref={gamma.ref} className="text-blue-600" />
      </div>
    </div>
  );
};
