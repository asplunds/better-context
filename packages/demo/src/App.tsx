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
      <div className="box">
        <button onClick={() => counter.value--}>-</button>
        {counter.value}
        <button onClick={() => counter.value++}>+</button>
      </div>
    </>
  );
}

export default App;
