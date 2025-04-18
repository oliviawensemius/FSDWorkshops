import { useEffect, useState } from "react";

export default function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // 1. No dependency array - runs after every render
  useEffect(() => {
    console.log("Effect with no dependency array - runs every render");
  });

  // 2. Empty dependency array - runs only once after initial render
  useEffect(() => {
    console.log("Effect with empty dependency array - runs once");
  }, []);

  // 3. With dependencies - runs when count changes
  useEffect(() => {
    setMessage(`Count is now: ${count}`);
    console.log("Effect with count dependency - runs when count changes");
  }, [count]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">useEffect Examples</h2>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <p>Message: {message}</p>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment Count
        </button>
      </div>
      <div className="text-sm text-gray-600">
        <p>Check the console to see when each effect runs!</p>
      </div>
    </div>
  );
}
