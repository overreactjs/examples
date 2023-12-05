import { Circle, Size, useCirclePhysics, useOffsetPosition, usePosition, useProperty } from "@engine";

export const Ball: React.FC = () => {
  const pos = usePosition([0, -100]);
  const radius = useProperty(25);
  const size = useProperty<Size>([radius.current * 2, radius.current * 2]);
  const circlePos = useOffsetPosition(pos, [-radius.current, -radius.current]);

  useCirclePhysics(pos, radius);

  return (
    <Circle pos={circlePos} size={size} color="cyan" />
  );
};
