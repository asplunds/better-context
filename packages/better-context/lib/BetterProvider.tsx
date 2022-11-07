import React from "react";

function betterProvider<T, S>(
  Provider: React.Provider<T>,
  value: (provided: S) => T
) {
  return function BetterProvider({
    provide,
    ...props
  }: Omit<React.ComponentProps<typeof Provider>, "value"> & {
    provide: S;
  }) {
    return <Provider value={value(provide)} {...props} />;
  };
}

export default betterProvider;
