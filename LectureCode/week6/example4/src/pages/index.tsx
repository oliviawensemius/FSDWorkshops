import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  // Load count from localStorage on initial render
  useEffect(() => {
    const savedCount = localStorage.getItem("counter");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("counter", count.toString());
  }, [count]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl mb-4">Counter with LocalStorage</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          -
        </button>
        <span className="text-xl font-[family-name:var(--font-geist-mono)]">
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Try refreshing the page - the count will persist!
      </p>
    </div>
  );
}
