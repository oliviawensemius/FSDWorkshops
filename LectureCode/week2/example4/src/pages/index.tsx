import React from "react";
import EventButton from "../components/EventButton";
import "../styles/pages/Home.css";

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Event Handling Example</h1>

      <div className="content">
        <div className="demo-section">
          <h2 className="section-title">Try it out:</h2>
          <EventButton />
        </div>

        <div className="about-section">
          <h2 className="about-title">About this example:</h2>
          <p className="about-text">
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
