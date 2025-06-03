import { Device, Engine, Physics } from "@overreact/engine";
import { MarbleJarGame } from "./MarbleJarGame";

export const MarbleJarDemo = () => {
  return (
    <Engine>
      <Physics>
        <Device bg="#223344" showFPS>
          <MarbleJarGame />
         </Device>
      </Physics>
    </Engine>
  );
};
