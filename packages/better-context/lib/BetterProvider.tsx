import React from "react";

function betterProvider<T extends {}>(Provider: React.Provider<T>, value: () => T) {
  return function BetterProvider(
    props: Omit<React.ComponentProps<typeof Provider>, "value">
  ) {
    return <Provider value={value()} {...props} />;
  };
}

export default betterProvider;
