import { Device, Engine } from "@overreact/engine";
import { ButtonsGame } from "./ButtonsGame";

export const ButtonsDemo = () => {
  return (
    <Engine>
      <Device mode="mobile">
        <ButtonsGame />
      </Device>
    </Engine>
  );
};
