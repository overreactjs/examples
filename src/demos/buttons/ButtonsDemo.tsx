import { Device, Engine } from "@overreact/engine";
import { ButtonsGame } from "./ButtonsGame";

export const ButtonsDemo = () => {
  return (
    <Engine>
      <Device>
        <ButtonsGame />
      </Device>
    </Engine>
  );
};
