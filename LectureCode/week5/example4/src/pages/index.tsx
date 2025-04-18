import { useState, useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    // Focus the input element using the ref
    inputRef.current?.focus();
  };

  const handleClear = () => {
    // Clear the input value
    setInputValue("");
    // Focus the input after clearing
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          useRef with Input Focus Example
        </h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something..."
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                onClick={handleFocus}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Focus Input
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear & Focus
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h2 className="text-lg font-semibold mb-2 text-black">
                Current Input Value:
              </h2>
              <p className="text-black">{inputValue || "No input yet"}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Points:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>useRef is used to create a reference to the input element</li>
            <li>The ref is attached to the input using the ref prop</li>
            <li>We can access the input element using inputRef.current</li>
            <li>focus() method is called on the input element to focus it</li>
            <li>This is useful for programmatically controlling input focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
