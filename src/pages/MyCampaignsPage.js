// src/pages/MyCampaignsPage.jsx
import React, { useEffect, useState } from "react";
import { listenMyCampaigns } from "../api/campaignApi";

function statusBadge(status) {
  const map = {
    APPROVED: { label: "APPROVED", bg: "#e8f5e9", border: "#2e7d32" },
    PENDING: { label: "PENDING", bg: "#fff8e1", border: "#f9a825" },
    DENIED: { label: "DENIED", bg: "#ffebee", border: "#c62828" },
  };
  return map[status] || { label: status, bg: "#eee", border: "#777" };
}

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const unsub = listenMyCampaigns(setCampaigns);
    return () => unsub && unsub();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>You haven’t created any campaigns yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {campaigns.map((c) => {
            const b = statusBadge(c.status);
            return (
              <div
                key={c.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <h3 style={{ margin: 0 }}>{c.title}</h3>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: b.bg,
                      border: `1px solid ${b.border}`,
                      fontSize: 12,
                      height: "fit-content",
                    }}
                  >
                    {b.label}
                  </span>
                </div>

                <p style={{ margin: "8px 0 10px" }}>{c.description}</p>

                {c.status === "DENIED" && c.reviewNote ? (
                  <p style={{ margin: 0 }}>
                    <b>Reason:</b> {c.reviewNote}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
