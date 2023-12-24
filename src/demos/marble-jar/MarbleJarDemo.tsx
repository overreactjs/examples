import { Device, Engine, Physics } from "@overreact/engine";
import { MarbleJarGame } from "./MarbleJarGame";

export const MarbleJarDemo = () => {
  return (
    <Engine>
      <Physics>
        <Device allowShake allowTilt bg="#223344">
          <MarbleJarGame />
         </Device>
      </Physics>
    </Engine>
  );
};
