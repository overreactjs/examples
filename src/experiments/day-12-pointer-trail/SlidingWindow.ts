/**
 * Hold onto a sliding window of pointer/cursor positions.
 */
export class SlidingWindow<T> {
  _values: T[] = [];
  size: number;
  index: number = 0;
  
  constructor(size: number) {
    this.size = size;
  }

  get values() {
    return [...this._values.slice(this.index), ...this._values.slice(0, this.index)];
  }

  push(value: T) {
    this._values[this.index] = value;
    this.index = (this.index + 1) % this.size;
  }
}
