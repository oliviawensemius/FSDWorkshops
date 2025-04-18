import React from "react";
import Greeting from "../components/Greeting";

export default function Home() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Greeting Examples</h1>

      <div className="space-y-6">
        {/* Basic greeting with just a name */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Basic greeting:</h3>
          <Greeting name="John" />
        </div>

        {/* Greeting with time of day specified */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Afternoon greeting:</h3>
          <Greeting name="Sarah" timeOfDay="afternoon" />
        </div>

        {/* Special greeting with custom message */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">
            Special greeting with custom message:
          </h3>
          <Greeting
            name="Mike"
            timeOfDay="evening"
            isSpecialGreeting={true}
            customMessage="Hope you're having a wonderful day!"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">About this example:</h2>
        <p className="text-gray-600">
          This example demonstrates how to use props to make components reusable
          and customizable. The Greeting component accepts different props like
          name, timeOfDay, isSpecialGreeting, and customMessage to change its
          appearance and content.
        </p>
      </div>
    </div>
  );
}
