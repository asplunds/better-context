# Better Context

Tiny React context wrapper for using contexts without the hassle

## Installation

```
npm i better-context
```

or with yarn:

```
yarn add better-context
```

## Usage

Create a context

```ts
const useCoolContext = betterContext(({ state }) => {
  const counter = useState(0);

  return {
    foo: "bar",
    counter: state(counter), // using the state wrapper is optional
  };
});
```

Provide it at highest common ancestor

```tsx
function App() {
  return (
    <useCoolContext.Provider>
      <Component />
    </useCoolContext.Provider>
  );
}
```

Consume the context

```tsx
function Component() {
  const { counter } = useCoolContext();

  // counter.value   (get)          ✅
  // counter.value = 123            ✅
  // counter.value++                ✅
  // counter.set(prev => prev + 1)  ✅

  return (
    <>
      <button onClick={() => counter.value--}>-</button>
      {counter.value}
      <button onClick={() => counter.value++}>+</button>
    </>
  );
}
```

It's that simple!
