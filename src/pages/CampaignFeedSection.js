import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listenApprovedCampaigns } from "../api/campaignApi";
import "./CampaignFeedSection.css";

export default function CampaignFeedSection() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const unsub = listenApprovedCampaigns(setCampaigns);
    return () => unsub();
  }, []);

  return (
    <div className="ax-feed">
      <div className="ax-feed__grid">
        {campaigns.map((c) => (
          <article className="ax-card" key={c.id}>
            <div className="ax-card__imageWrap">
              {c.imageUrl ? (
                <img
                  className="ax-card__img"
                  src={c.imageUrl}
                  alt={c.title || "Campaign"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="ax-card__imgPlaceholder" />
              )}
            </div>

            <h3 className="ax-card__title">{c.title || "Untitled Campaign"}</h3>

            <p className="ax-card__desc">
              {c.description || "No description available for this campaign yet."}
            </p>

            {c.donateUrl ? (
              <a
                className="ax-card__btn"
                href={c.donateUrl}
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
            ) : (
              <Link className="ax-card__btn" to={`/campaign/${c.id}`}>
                View
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}