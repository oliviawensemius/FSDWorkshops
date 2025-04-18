import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Section from "../components/Section";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <Navigation />

      <main className="main">
        <Section title="Welcome">
          <p>Welcome to our website! We're glad you're here.</p>
        </Section>

        <Section title="About Us">
          <p>
            We are a company dedicated to providing excellent service to our
            customers.
          </p>
        </Section>

        <Section title="Our Services">
          <ul>
            <li>Web Development</li>
            <li>Mobile Development</li>
            <li>Cloud Solutions</li>
            <li>Consulting</li>
          </ul>
        </Section>

        <Section title="Contact">
          <p>Get in touch with us at contact@example.com</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
