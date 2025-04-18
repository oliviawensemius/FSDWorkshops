import { useState } from "react";
import React from "react";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">React Fragments Example</h1>

      {/* Example 1: Using Fragment to group multiple elements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Example 1: Basic Fragment
        </h2>
        <>
          <p className="mb-2">This is the first paragraph.</p>
          <p className="mb-2">This is the second paragraph.</p>
          <p>This is the third paragraph.</p>
        </>
      </div>

      {/* Example 2: Conditional rendering with Fragment */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Example 2: Conditional Fragment
        </h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <>
            <p className="mb-2">This is detail line 1</p>
            <p className="mb-2">This is detail line 2</p>
            <p>This is detail line 3</p>
          </>
        )}
      </div>
    </div>
  );
}
