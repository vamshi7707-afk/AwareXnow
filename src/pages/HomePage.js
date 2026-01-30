import React, { useEffect, useState } from "react";
import { listenApprovedCampaigns } from "../api/campaignApi";

export default function HomePage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const unsub = listenApprovedCampaigns(setCampaigns);
    return () => unsub();
  }, []);

  return (
    <div className="feedWrap">
      <h2 className="pageTitle">Campaign Feed</h2>

      <div className="grid">
        {campaigns.map((c) => (
          <div key={c.id} className="card cardPad">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3>{c.title}</h3>
              <span className="badge">APPROVED</span>
            </div>

            {c.imageUrl && (
              <img
                src={c.imageUrl}
                alt={c.title}
                style={{
                  width: "100%",
                  marginTop: 12,
                  borderRadius: 8,
                }}
              />
            )}

            <p style={{ marginTop: 12 }}>{c.description}</p>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <span className="smallMuted">By {c.createdByName}</span>

              {c.donateUrl && (
                <a
                  href={c.donateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button buttonPrimary"
                >
                  Donate
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
