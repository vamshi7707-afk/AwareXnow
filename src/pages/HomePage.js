// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

import mainpage from "../assets/mainpage.jpg";

// ✅ section backgrounds saved in src/assets
import FC from "../assets/FC.jpg";
import SMB from "../assets/SMB.jpg";
import AU from "../assets/AU.jpg";
import CS from "../assets/CS.jpg";

import CampaignFeedSection from "./CampaignFeedSection";
import SmallBusinessFeed from "./SmallBusinessFeed";
import "./HomePage.css";

export default function HomePage() {
  const scrollToCampaigns = () => {
    const section = document.getElementById("campaign-feed");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToSmallBusiness = () => {
    const section = document.getElementById("small-business");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home">
      {/* HERO */}
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${mainpage})` }}
      >
        <div className="home-hero__overlay" />

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

            <button
              type="button"
              className="home-btn home-btn--outline"
              onClick={scrollToSmallBusiness}
            >
              Explore Small Businesses
            </button>

            <Link className="home-btn home-btn--outline" to="/create">
              Create Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION (FC background) */}
      <section
        className="home-featured section-bg"
        id="campaign-feed"
        style={{ backgroundImage: `url(${FC})` }}
      >
        <div className="section-overlay section-overlay--featured" />
        <div className="section-content">
          <div className="home-featured__inner">
            <h2>Featured Campaigns</h2>
            <p>
              Social awareness is a key part of emotional intelligence. Through
              education and community engagement, we promote empathy, compassion,
              and healthy relationships to build a more connected society.
            </p>
          </div>

          <CampaignFeedSection />
        </div>
      </section>

      {/* SMALL BUSINESS SECTION (SMB background) */}
      <section
        className="home-smallbusiness section-bg"
        id="small-business"
        style={{ backgroundImage: `url(${SMB})` }}
      >
        <div className="section-overlay section-overlay--featured" />
        <div className="section-content">
          <SmallBusinessFeed />
        </div>
      </section>

      {/* ABOUT SECTION (AU background) */}
      <section
        className="ax-aboutV2 section-bg"
        id="about"
        style={{ backgroundImage: `url(${AU})` }}
      >
        <div className="section-overlay section-overlay--featured" />
        <div className="section-content">
          <div className="ax-wrap">
            <header className="ax-aboutV2__header">
              <h2>About Us</h2>
              <p>
                AwareXNow is a social awareness platform built to turn everyday
                support into real-world impact. We help people discover meaningful
                causes, promote community-led campaigns, and make it simple to
                take action.
              </p>
            </header>

            <div className="ax-aboutV2__grid">
              <div className="ax-panel">
                <h3>Our mission</h3>
                <p>
                  To connect individuals, organizations, and small businesses with
                  causes that matter—across health, education, environment, and
                  social wellbeing.
                </p>
                <p>
                  Whether it’s donating, volunteering, or sharing a campaign, we
                  make it easy for anyone to contribute in minutes.
                </p>

                <div className="ax-pillRow">
                  <span className="ax-pill">Community first</span>
                  <span className="ax-pill">Easy actions</span>
                  <span className="ax-pill">Clear impact</span>
                </div>
              </div>

              <div className="ax-panel ax-panel--dark">
                <h3>What we provide</h3>
                <ul className="ax-checklist">
                  <li>
                    <span>✓</span> A simple place to explore featured campaigns
                  </li>
                  <li>
                    <span>✓</span> Tools for creating campaigns that get noticed
                  </li>
                  <li>
                    <span>✓</span> A supportive space for people who want to help
                  </li>
                  <li>
                    <span>✓</span> Transparency-focused content so supporters can
                    trust
                  </li>
                </ul>
              </div>
            </div>

            <div className="ax-statsV2">
              <div className="ax-statCard">
                <div className="ax-statCard__num">200+</div>
                <div className="ax-statCard__label">Projects Completed</div>
              </div>

              <div className="ax-statCard">
                <div className="ax-statCard__num">500+</div>
                <div className="ax-statCard__label">Happy Supporters</div>
              </div>

              <div className="ax-statCard">
                <div className="ax-statCard__num">100+</div>
                <div className="ax-statCard__label">Active Volunteers</div>
              </div>

              <div className="ax-statCard">
                <div className="ax-statCard__num">24/7</div>
                <div className="ax-statCard__label">Community Driven</div>
              </div>
            </div>

            <div className="ax-ctaV2">
              <div className="ax-ctaBox">
                <h3>Want to start a campaign?</h3>
                <p>
                  Share your cause with the community and get support from people
                  who care.
                </p>
                <Link to="/create" className="ax-ctaBtn ax-ctaBtn--dark">
                  Create Campaign
                </Link>
              </div>

              <div className="ax-ctaBox ax-ctaBox--soft">
                <h3>Want to support a cause?</h3>
                <p>
                  Explore featured campaigns and take action today—donate, share,
                  or volunteer.
                </p>
                <button
                  type="button"
                  className="ax-ctaBtn ax-ctaBtn--outline"
                  onClick={scrollToCampaigns}
                >
                  Explore Campaigns
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (CS background) */}
      <section
        className="ax-contactV2 section-bg"
        id="contact"
        style={{ backgroundImage: `url(${CS})` }}
      >
        <div className="section-overlay section-overlay--featured" />
        <div className="section-content">
          <div className="ax-wrap">
            <header className="ax-contactV2__header">
              <h2>Contact Us</h2>
              <p>
                Questions, feedback, or help with a campaign? Send us a message
                and our team will reply soon.
              </p>
            </header>

            <div className="ax-contactV2__grid">
              <div className="ax-panel ax-panel--dark">
                <h3>Contact details</h3>

                <div className="ax-infoRow">
                  <div className="ax-infoKey">Email</div>
                  <div className="ax-infoVal">support@awarexnow.com</div>
                </div>

                <div className="ax-infoRow">
                  <div className="ax-infoKey">Phone</div>
                  <div className="ax-infoVal">+61 412 345 678</div>
                </div>

                <div className="ax-infoRow">
                  <div className="ax-infoKey">Location</div>
                  <div className="ax-infoVal">Adelaide, Australia</div>
                </div>

                <div className="ax-note">
                  For faster support, include your campaign title and a screenshot
                  (if possible).
                </div>
              </div>

              <form
                className="ax-panel ax-formV2"
                onSubmit={(e) => e.preventDefault()}
              >
                <h3>Send a message</h3>

                <label className="ax-fieldV2">
                  <span>Name</span>
                  <input type="text" placeholder="Your name" />
                </label>

                <label className="ax-fieldV2">
                  <span>Email</span>
                  <input type="email" placeholder="you@example.com" />
                </label>

                <label className="ax-fieldV2">
                  <span>Message</span>
                  <textarea rows="5" placeholder="How can we help?" />
                </label>

                <button
                  type="submit"
                  className="ax-ctaBtn ax-ctaBtn--dark ax-full"
                >
                  Send Message
                </button>

                <p className="ax-hint">
                  (UI only) If you want, I can connect this to Firestore to store
                  messages.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}