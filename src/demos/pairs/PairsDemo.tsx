import { Device, Engine } from "@engine";
import { Close } from "@components";
import { Cards } from "./Cards";

export const PairsDemo = () => {
  return (
    <Engine>
      <Device bg="#223344">
        <Cards />
        <Close />
      </Device>
    </Engine>
  );
};



