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
const useCoolContext = betterContext()(({ state, provided }) => {
  const counter = useState(0);

  return {
    foo: "bar",
    counter: state(counter), // using the state wrapper is optional
    output: "foo bar " + provided, // "foo bar baz"
  };
});
```

Provide it at highest common ancestor

```tsx
function App() {
  return (
    <useCoolContext.Provider provide="baz">
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

### TypeScript

The reason for using currying to instantiate the better context is because TypeScript as of now does not support [partial type argument inference](https://github.com/microsoft/TypeScript/issues/26242). Thus, to circumvent this issue currying is utilized to allow the context return value to be inferred while the provided value can be given or left unused:

```tsx
type Provided = {
  foo: string;
  bar: number;
};

const useTsContext = betterContext<Provided>()(({ provided }) => {
  const counter = useState(0);

  return `${provided.foo}: ${provided.bar}`;
});
/* ... */
<useTsContext.Provider
  provide={{
    foo: "baz",
    bar: 1337,
  }}
>
  ...
</useTsContext.Provider>;
```
