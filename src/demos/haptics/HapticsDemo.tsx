import { Device, Engine } from "@overreact/engine";
import { useHaptics } from "@overreact/capacitor";

export const HapticsDemo = () => {
  return (
    <Engine>
      <Device mode="mobile">
        <HapticsGame />
      </Device>
    </Engine>
  );
};

const HapticsGame: React.FC = () => {
  const { impact, vibrate, notification } = useHaptics();

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-12 font-[quicksand] font-bold text-xl">
        <button onClick={() => impact('heavy')}>Impact (Heavy)</button>
        <button onClick={() => impact('medium')}>Impact (Medium)</button>
        <button onClick={() => impact('light')}>Impact (Light)</button>
        <button onClick={() => vibrate(300)}>Vibrate (300ms)</button>
        <button onClick={() => notification('success')}>Notification (Success)</button>
        <button onClick={() => notification('warning')}>Notification (Warning)</button>
        <button onClick={() => notification('error')}>Notification (Error)</button>
      </div>
    </div>
  );
};
