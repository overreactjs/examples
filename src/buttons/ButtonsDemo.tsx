import { Device, Engine } from "@overreact/engine";
import { ButtonsGame } from "./ButtonsGame";

export const ButtonsDemo = () => {
  return (
    <Engine>
      <Device>
        <div className="w-full h-full grid place-items-center">
          <ButtonsGame />
        </div>
      </Device>
    </Engine>
  );
};
