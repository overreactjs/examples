import { Box, Engine, Viewport } from "@overreact/engine";
import { Screen } from "./Screen";

export const ResponsiveDemo = () => {
  return (
    <div className="w-full h-full">
      <Engine>
        <Screen size={[480, 360]} scale="auto" expand="full">
          <Viewport scale={0.8}>
            <Box pos={[-2000, -2000]} size={[4000, 4000]} color="cyan" />
            <Box pos={[-240, -180]} size={[480, 360]} color="magenta" />
          </Viewport>
        </Screen>
      </Engine>
    </div>
  );
};
