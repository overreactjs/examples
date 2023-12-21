import { Device, Engine } from "@engine";
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
