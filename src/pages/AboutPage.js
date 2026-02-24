import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Us</h1>

        <p>
          AwareXNow is a social awareness platform dedicated to creating
          positive change through connection, compassion, and community action.
        </p>

        <p>
          We bring together individuals, organizations, and businesses to
          support meaningful causes across health, education, environment, and
          social wellbeing. Our mission is to make it easy for everyone to
          discover real issues, take action, and see the impact of their
          support.
        </p>

        <p>
          We empower individuals and organizations to support meaningful causes
          and turn everyday kindness into lasting impact.
        </p>

        <div className="about-stats">
          <div>
            <h2>200+</h2>
            <span>Projects Completed</span>
          </div>

          <div>
            <h2>500+</h2>
            <span>Happy Clients</span>
          </div>

          <div>
            <h2>100+</h2>
            <span>Team Members</span>
          </div>
        </div>
      </div>
    </div>
  );
}