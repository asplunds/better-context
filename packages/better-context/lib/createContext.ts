import type React from "react";
import { createContext, useContext } from "react";
import betterProvider from "./BetterProvider";
import { default as stateWrapper } from "./state";

type BetterProvider<T> = {
  (): T;
  readonly Provider: (
    props: Omit<React.ProviderProps<T>, "value">
  ) => JSX.Element;
};

type Factory = <T extends {}>(
  fn: ({
    state,
  }: {
    state: <T>(input: [T, React.Dispatch<React.SetStateAction<T>>]) => {
      set: React.Dispatch<React.SetStateAction<T>>;
      value: T;
    };
  }) => T
) => BetterProvider<T>;

const betterContext: Factory = (value) => {
  const context = createContext({});

  const builder = function () {
    return useContext(context);
  };

  Object.defineProperty(builder, "Provider", {
    value: betterProvider(context.Provider, () =>
      value({ state: stateWrapper })
    ),
    writable: false,
  });

  return builder as any;
};

export default betterContext;
