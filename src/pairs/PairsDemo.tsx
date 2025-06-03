import { Device, Engine } from "@overreact/engine";
import { Cards } from "./Cards";

export const PairsDemo = () => {
  return (
    <Engine>
      <Device bg="#223344">
        <div className="w-full h-full grid place-items-center">
          <Cards />
        </div>
      </Device>
    </Engine>
  );
};



