import { useState } from "react";
import { CounterProvider } from "../context/CounterContext";
import PropDrillingLevelOne from "../components/PropDrilling/LevelOne";
import ContextLevelOne from "../components/Context/LevelOne";

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Component Communication Examples
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prop Drilling Example */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Prop Drilling Example</h2>
          <PropDrillingLevelOne
            count={count}
            increment={increment}
            decrement={decrement}
          />
        </div>

        {/* Context Example */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Context Example</h2>
          <CounterProvider value={{ count, increment, decrement }}>
            <ContextLevelOne />
          </CounterProvider>
        </div>
      </div>
    </div>
  );
}
