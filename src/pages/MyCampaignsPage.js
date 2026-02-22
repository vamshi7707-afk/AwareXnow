// src/pages/MyCampaignsPage.jsx
import React, { useEffect, useState } from "react";
import { deleteCampaign, listenMyCampaigns } from "../api/campaignApi";
import {
  Grid,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
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
  const [flag, setFlag] = useState(false)
  const onDelete = async (id) => {
    await deleteCampaign(id)
    setFlag(!flag)
  }

  useEffect(() => {
    const unsub = listenMyCampaigns(setCampaigns);
    return () => unsub && unsub();
  }, [flag]);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Campaigns</h2>



      {campaigns.length === 0 ? (
        <p>You haven’t created any campaigns yet.</p>
      ) : (
        <Grid container spacing={3}>
          {campaigns.map((c) => {
            const b = statusBadge(c.status);
            return (
              <Grid size={4} item xs={12} sm={6} md={4} key={c.id}>
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



                  <Button
                    variant="text"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{
                      px: 1,
                      py: 1.5,
                    }}
                    onClick={() => onDelete(c.id)}
                  >Delete</Button>

                  {c.status === "DENIED" && c.reviewNote ? (
                    <p style={{ margin: 0 }}>
                      <b>Reason:</b> {c.reviewNote}
                    </p>
                  ) : null}
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
