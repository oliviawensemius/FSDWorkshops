import { useState, useCallback, memo, useEffect, useRef } from "react";

// A memoized component that will only re-render if its props change
const ExpensiveButton = memo(
  ({ onClick, label }: { onClick: () => void; label: string }) => {
    const renderCount = useRef(0);
    const [showRenderCount, setShowRenderCount] = useState(false);
    renderCount.current += 1;

    useEffect(() => {
      setShowRenderCount(true);
    }, []);

    return (
      <div className="space-y-2">
        <button
          onClick={onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {label}
        </button>
        {showRenderCount && (
          <p className="text-sm text-gray-600">
            Button rendered {renderCount.current} times
          </p>
        )}
      </div>
    );
  }
);

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [showRenderCount, setShowRenderCount] = useState(false);
  const parentRenderCount = useRef(0);
  parentRenderCount.current += 1;

  useEffect(() => {
    setShowRenderCount(true);
  }, []);

  // This function is recreated on every render
  const handleIncrement1 = () => {
    setCount1((c) => c + 1);
  };

  // This function is memoized and never changes
  const handleIncrement2 = useCallback(() => {
    setCount2((c) => c + 1);
  }, []); // Empty dependency array means it never changes

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          useCallback + React.memo Example
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* This button will re-render on every state change */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Without useCallback
            </h2>
            <ExpensiveButton
              onClick={handleIncrement1}
              label={`Increment ${count1}`}
            />
            <p className="text-sm text-gray-600">
              This button re-renders on every state change because its onClick
              function is recreated each time
            </p>
          </div>

          {/* This button will only re-render when count2 changes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              With useCallback
            </h2>
            <ExpensiveButton
              onClick={handleIncrement2}
              label={`Increment ${count2}`}
            />
            <p className="text-sm text-gray-600">
              This button only re-renders when count2 changes because its
              onClick function is memoized
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            How it works:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              {showRenderCount && (
                <>
                  Parent component has rendered {parentRenderCount.current}{" "}
                  times
                </>
              )}
            </li>
            <li>
              Both buttons are wrapped in React.memo to prevent unnecessary
              re-renders
            </li>
            <li>
              The left button's onClick function is recreated on every render
            </li>
            <li>
              The right button's onClick function is memoized with useCallback
            </li>
            <li>Click either button and watch the render counts</li>
            <li>
              Notice how the memoized version only re-renders when its own count
              changes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
