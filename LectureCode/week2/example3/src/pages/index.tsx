import React from "react";
import EventButton from "../components/EventButton";

export default function Home() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Event Handling Example</h1>

      <div className="space-y-6">
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Try it out:</h2>
          <EventButton />
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">About this example:</h2>
          <p className="text-gray-600">
            This example demonstrates how to handle browser events in React.
            When you click the button, it triggers a function (handleClick) that
            shows an alert. This is a simple example of event handling, but the
            same principle applies to more complex interactions like form
            submissions, hover effects, or keyboard events.
          </p>
        </div>
      </div>
    </div>
  );
}
