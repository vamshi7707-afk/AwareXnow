import React from "react";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>

        <p className="contact-subtitle">
          We'd love to hear from you. Whether you have a question about
          campaigns, donations, or anything else, our team is ready to
          answer all your questions.
        </p>

        <div className="contact-info">
          <span>📍 Adelaide, Australia</span>
          <span>|</span>
          <span>📞 +61 410 000 014</span>
          <span>|</span>
          <span>✉️ info@awarexnow.com</span>
        </div>
      </div>
    </div>
  );
}