import { useState } from "react";
import betterContext from "better-context";
import "./App.css";

const useCoolContext = betterContext(({ state }) => {
  const counter = useState(0);

  return {
    counter: state(counter),
  };
});

function App() {
  return (
    <useCoolContext.Provider>
      <Consumer />
    </useCoolContext.Provider>
  );
}

function Consumer() {
  const { counter } = useCoolContext();
  
  return (
    <>
      <button onClick={() => counter.value--}>-1</button>
      {counter.value}
      <button onClick={() => counter.set((prev) => prev + 1)}>+1</button>
    </>
  );
}

export default App;
