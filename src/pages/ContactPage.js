import React from "react";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="axc-page">
      <div className="axc-wrap">
        <h1 className="axc-title">Contact Us</h1>

        <p className="axc-sub">
          We'd love to hear from you. Whether you have a question about campaigns,
          donations, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="axc-grid">
          <div className="axc-card">
            <div className="axc-cardTitle">Location</div>
            <div className="axc-cardValue">📍 Adelaide, Australia</div>
          </div>

          <div className="axc-card">
            <div className="axc-cardTitle">Phone</div>
            <div className="axc-cardValue">📞 +61 410 000 014</div>
          </div>

          <div className="axc-card">
            <div className="axc-cardTitle">Email</div>
            <div className="axc-cardValue">✉️ info@awarexnow.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}