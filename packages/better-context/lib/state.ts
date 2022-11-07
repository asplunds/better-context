import type React from "react";

function state<T>(input: [T, ((n: T | (((n: T) => T))) => T | void)]) {
  const [value, dispatch] = input;

  const state = {
    set: dispatch,
    get value() {
      return value;
    },
    set value(value: T) {
      dispatch(value);
    },
  };

  return state;
}

export default state;
