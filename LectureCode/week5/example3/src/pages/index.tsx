import { useState, useRef, useEffect } from "react";

export default function Home() {
  // State will trigger re-renders when updated
  const [count, setCount] = useState(0);
  // Ref won't trigger re-renders when updated
  const countRef = useRef(0);
  const renderCount = useRef(0);
  const [showRenderCount, setShowRenderCount] = useState(false);
  renderCount.current += 1;

  useEffect(() => {
    setShowRenderCount(true);
  }, []);

  // Effect to demonstrate ref persistence
  useEffect(() => {
    const interval = setInterval(() => {
      countRef.current += 1;
      console.log("Ref value:", countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          useState vs useRef Example
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* State example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Using useState
            </h2>
            <div className="space-y-4">
              <p className="text-2xl font-bold text-blue-600">Count: {count}</p>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment State
              </button>
              <p className="text-sm text-gray-600">
                This will trigger a re-render when updated
              </p>
            </div>
          </div>

          {/* Ref example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Using useRef
            </h2>
            <div className="space-y-4">
              <p className="text-2xl font-bold text-green-600">
                Ref Value: {countRef.current}
              </p>
              <button
                onClick={() => {
                  countRef.current += 1;
                  console.log("Ref updated:", countRef.current);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Increment Ref
              </button>
              <p className="text-sm text-gray-600">
                This won't trigger a re-render when updated
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Differences:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {showRenderCount && (
              <li>Component has rendered {renderCount.current} times</li>
            )}
            <li>useState updates trigger re-renders, useRef updates don't</li>
            <li>useRef values persist between renders</li>
            <li>
              Notice how the ref value updates in the console but not in the UI
            </li>
            <li>There's a background timer updating the ref every second</li>
            <li>Check the console to see the ref value changing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
