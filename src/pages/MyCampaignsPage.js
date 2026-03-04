// src/pages/MyCampaignsPage.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { deleteCampaign, listenMyCampaigns } from "../api/campaignApi";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from "@mui/icons-material/Paid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

function statusBadge(status) {
  const map = {
    APPROVED: { label: "APPROVED", bg: "#e8f5e9", border: "#2e7d32" },
    PENDING: { label: "PENDING", bg: "#fff8e1", border: "#f9a825" },
    DENIED: { label: "DENIED", bg: "#ffebee", border: "#c62828" },
  };
  return map[status] || { label: status || "PENDING", bg: "#eee", border: "#777" };
}

export default function MyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const onDelete = async (id) => {
    try {
      await deleteCampaign(id);
    } catch (e) {
      console.error("Delete failed:", e);
      setErr(e.message || "Delete failed.");
    }
  };

  useEffect(() => {
    let unsubCampaigns = () => {};

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      unsubCampaigns();
      setErr("");
      setLoading(true);

      if (user) {
        unsubCampaigns = listenMyCampaigns(
          user.uid,
          (rows) => {
            setCampaigns(rows);
            setLoading(false);
          },
          (message) => {
            setErr(message || "Failed to load campaigns.");
            setLoading(false);
          }
        );
      } else {
        setCampaigns([]);
        setLoading(false);
        unsubCampaigns = () => {};
      }
    });

    return () => {
      unsubCampaigns();
      unsubAuth();
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Campaigns</h2>

      {err && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : campaigns.length === 0 ? (
        <p>You haven’t created any campaigns yet.</p>
      ) : (
        <Grid container spacing={3}>
          {campaigns.map((c) => {
            const b = statusBadge(c.status);

            return (
              <Grid item xs={12} sm={6} md={4} key={c.id}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt={c.title || "Campaign"}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div style={{ padding: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <h3 style={{ margin: 0 }}>{c.title || "Untitled"}</h3>

                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: b.bg,
                          border: `1px solid ${b.border}`,
                          fontSize: 12,
                        }}
                      >
                        {b.label}
                      </span>
                    </div>

                    <p style={{ margin: "8px 0 12px" }}>
                      {c.description || "No description provided."}
                    </p>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="text"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete(c.id)}
                      >
                        Delete
                      </Button>

                      {c.status === "APPROVED" && (
                        <Button
                          variant="contained"
                          startIcon={<PaidIcon />}
                          onClick={() =>
                            (window.location.href = `/campaign/${c.id}`)
                          }
                        >
                          Donate
                        </Button>
                      )}
                    </Stack>

                    {c.status === "DENIED" && c.reviewNote && (
                      <p style={{ marginTop: 10 }}>
                        <b>Reason:</b> {c.reviewNote}
                      </p>
                    )}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}