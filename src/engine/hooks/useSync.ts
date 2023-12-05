import { useState } from "react";
import { useUpdate } from "./useUpdate";

export function useSync<T>(fn: () => T) {
  const [value, setValue] = useState<T>();

  useUpdate(() => {
    const newValue = fn();
    if (newValue !== value) {
      setValue(newValue);
    }
  });

  return value;
}
