import React, { useEffect, useState } from "react";
import {
  approveCampaign,
  denyCampaign,
  listenPendingCampaigns,
  deleteCampaign,
  seedSampleCampaigns,
  listenApprovedCampaignsForAdmin,
} from "../api/campaignApi";

export default function AdminReviewPage() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [denyNote, setDenyNote] = useState({});
  const [msg, setMsg] = useState("");

  // Load pending + approved campaigns
  useEffect(() => {
    const unsubPending = listenPendingCampaigns(setPending);
    const unsubApproved = listenApprovedCampaignsForAdmin(setApproved);
    return () => {
      unsubPending();
      unsubApproved();
    };
  }, []);

  async function handleApprove(id) {
    setMsg("");
    try {
      await approveCampaign(id);
      setMsg("✅ Campaign approved.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  }

  async function handleDeny(id) {
    setMsg("");
    try {
      const note = (denyNote[id] || "").trim();
      await denyCampaign(id, note);
      setMsg("✅ Campaign denied.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Permanently delete this campaign?");
    if (!ok) return;

    setMsg("");
    try {
      await deleteCampaign(id);
      setMsg("🗑️ Campaign deleted.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  }

  async function handleSeed() {
    setMsg("");
    try {
      await seedSampleCampaigns();
      setMsg("✅ Added 3 sample campaigns (PENDING).");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  }

  return (
    <div className="container">
      <h2 className="pageTitle">Admin Panel</h2>
      <p className="pageSubtitle">
        Manage campaigns (Pending + Approved). You can approve/deny pending items and delete anything.
      </p>

      <button
        className="button buttonPrimary"
        onClick={handleSeed}
        style={{ marginBottom: 16 }}
      >
        Add Sample Campaigns
      </button>

      {msg && <div className="msg">{msg}</div>}

      {/* PENDING SECTION */}
      <h3 style={{ marginTop: 10 }}>Pending Campaigns</h3>
      {pending.length === 0 ? (
        <div className="card cardPad">No pending campaigns.</div>
      ) : (
        <div className="grid">
          {pending.map((c) => (
            <div key={c.id} className="card cardPad">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h4 style={{ margin: 0 }}>{c.title}</h4>
                <span className="badge">PENDING</span>
              </div>

              {c.imageUrl ? (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  style={{ width: "100%", marginTop: 12, borderRadius: 8 }}
                />
              ) : null}

              <p style={{ marginTop: 12 }}>{c.description}</p>

              <div className="smallMuted" style={{ marginBottom: 10 }}>
                Submitted by: {c.createdByName || c.createdBy}
              </div>

              <div className="row">
                <button className="button buttonPrimary" onClick={() => handleApprove(c.id)}>
                  Approve
                </button>
                <button className="button" onClick={() => handleDeny(c.id)}>
                  Deny
                </button>
                <button className="button buttonDanger" onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </div>

              <div style={{ marginTop: 10 }}>
                <div className="label">Optional deny reason</div>
                <input
                  className="input"
                  placeholder="Reason for denial"
                  value={denyNote[c.id] || ""}
                  onChange={(e) =>
                    setDenyNote((prev) => ({ ...prev, [c.id]: e.target.value }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* APPROVED SECTION */}
      <h3 style={{ marginTop: 22 }}>Approved Campaigns</h3>
      {approved.length === 0 ? (
        <div className="card cardPad">No approved campaigns.</div>
      ) : (
        <div className="grid">
          {approved.map((c) => (
            <div key={c.id} className="card cardPad">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h4 style={{ margin: 0 }}>{c.title}</h4>
                <span className="badge">APPROVED</span>
              </div>

              {c.imageUrl ? (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  style={{ width: "100%", marginTop: 12, borderRadius: 8 }}
                />
              ) : null}

              <p style={{ marginTop: 12 }}>{c.description}</p>

              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="smallMuted">By: {c.createdByName || "Unknown"}</span>

                {c.donateUrl ? (
                  <a
                    className="button buttonPrimary"
                    href={c.donateUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Donate Link
                  </a>
                ) : null}
              </div>

              <div className="row" style={{ marginTop: 10 }}>
                <button className="button buttonDanger" onClick={() => handleDelete(c.id)}>
                  Delete Approved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
