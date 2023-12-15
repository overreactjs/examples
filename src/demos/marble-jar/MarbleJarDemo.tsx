import { Device, Engine, Physics } from "@engine";
import { Close, Debug } from "@components";
import { MarbleJarGame } from "./MarbleJarGame";

export const MarbleJarDemo = () => {
  return (
    <Engine>
      <Physics>
        <Device allowShake allowTilt bg="#223344">
          <MarbleJarGame />
          <Close />
          <Debug />
         </Device>
      </Physics>
    </Engine>
  );
};
