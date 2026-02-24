import React from "react";
import { Link } from "react-router-dom";
import mainpage from "../assets/mainpage.jpg";
import CampaignFeedSection from "./CampaignFeedSection";
import "./HomePage.css";

export default function HomePage() {
  const scrollToCampaigns = () => {
    const section = document.getElementById("campaign-feed");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home">
      {/* HERO */}
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${mainpage})` }}
      >
        <div className="home-hero__overlay"></div>

        <div className="home-hero__content">
          <h1>Join the Movement, Make an Impact</h1>

          <p>
            Join our platform to support social causes
            <br />
            and promote small businesses
          </p>

          <div className="home-hero__actions">
            <button
              type="button"
              className="home-btn home-btn--dark"
              onClick={scrollToCampaigns}
            >
              Explore Campaigns
            </button>

            <Link className="home-btn home-btn--outline" to="/create">
              Create Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION (matches screenshot) */}
      <section className="home-featured" id="campaign-feed">
        <div className="home-featured__inner">
          <h2>Featured Campaign</h2>

          <p>
            Social awareness is a key part of emotional intelligence. Through
            education and community engagement, we promote empathy, compassion,
            and healthy relationships to build a more connected society.
          </p>
        </div>

        <CampaignFeedSection />
      </section>
    </div>
  );
}