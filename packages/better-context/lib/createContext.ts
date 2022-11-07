import type React from "react";
import { createContext, useContext } from "react";
import betterProvider from "./BetterProvider";
import { default as stateWrapper } from "./state";

type BetterProvider<T, S> = {
  (): T;
  readonly Provider: (
    props: Omit<React.ProviderProps<T>, "value"> & {
      provide?: S;
    }
  ) => JSX.Element;
};

function betterContext<S = void>() {
  return function <T>(
    cb: (v: {
      state: <T>(input: [T, ((n: T | (((n: T) => T))) => T | void)]) => {
        set: ((n: T | (((n: T) => T))) => T | void);
        value: T;
      };
      provided: S;
    }) => T
  ): BetterProvider<T, S> {
    const context = createContext({});

    const builder = function () {
      return useContext(context);
    };

    Object.defineProperty(builder, "Provider", {
      value: betterProvider<T, S>(
        context.Provider as React.Provider<T>,
        (provided: S) => cb({ state: stateWrapper, provided })
      ),
      writable: false,
    });

    return builder as any;
  };
}

export default betterContext;
