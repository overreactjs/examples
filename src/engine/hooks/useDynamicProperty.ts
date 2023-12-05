import { useMemo } from "react";
import { Property } from "@engine";

export function useDynamicProperty<T, R>(value: Property<T>, fn: (value: T) => R) {
  return useMemo(() => new DynamicProperty(value, fn), [fn, value]);
}

export class DynamicProperty<T, R> {
  
  value: Property<T>;
  fn: (value: T) => R;

  constructor(value: Property<T>, fn: (value: T) => R) {
    this.value = value;
    this.fn = fn;
  }
  
  get current(): R {
    return this.fn(this.value.current);
  }
}
  