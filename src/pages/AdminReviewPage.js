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
  const [busyId, setBusyId] = useState(""); // track which card is running an action

  useEffect(() => {
    const unsubPending = listenPendingCampaigns(setPending);
    const unsubApproved = listenApprovedCampaignsForAdmin(setApproved);
    return () => {
      unsubPending();
      unsubApproved();
    };
  }, []);

  async function handleApprove(id) {
    const ok = window.confirm("Approve this campaign?");
    if (!ok) return;

    setMsg("");
    setBusyId(id);
    try {
      await approveCampaign(id);
      setMsg("✅ Campaign approved.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusyId("");
    }
  }

  async function handleDeny(id) {
    const ok = window.confirm("Deny this campaign?");
    if (!ok) return;

    setMsg("");
    setBusyId(id);
    try {
      const note = (denyNote[id] || "").trim();
      await denyCampaign(id, note);

      // clear note for that campaign
      setDenyNote((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      setMsg("✅ Campaign denied.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusyId("");
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Permanently delete this campaign? This cannot be undone.");
    if (!ok) return;

    setMsg("");
    setBusyId(id);
    try {
      await deleteCampaign(id);
      setMsg("🗑️ Campaign deleted.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusyId("");
    }
  }

  async function handleSeed() {
    setMsg("");
    setBusyId("seed");
    try {
      await seedSampleCampaigns();
      setMsg("✅ Added 3 sample campaigns (PENDING).");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusyId("");
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
        disabled={busyId === "seed"}
        style={{ marginBottom: 16 }}
      >
        {busyId === "seed" ? "Adding..." : "Add Sample Campaigns"}
      </button>

      {msg && <div className="msg">{msg}</div>}

      {/* PENDING SECTION */}
      <h3 style={{ marginTop: 10 }}>Pending Campaigns</h3>
      {pending.length === 0 ? (
        <div className="card cardPad">No pending campaigns.</div>
      ) : (
        <div className="grid">
          {pending.map((c) => {
            const isBusy = busyId === c.id;
            return (
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
                  <button
                    className="button buttonPrimary"
                    onClick={() => handleApprove(c.id)}
                    disabled={isBusy}
                  >
                    {isBusy ? "Working..." : "Approve"}
                  </button>

                  <button className="button" onClick={() => handleDeny(c.id)} disabled={isBusy}>
                    {isBusy ? "Working..." : "Deny"}
                  </button>

                  <button
                    className="button buttonDanger"
                    onClick={() => handleDelete(c.id)}
                    disabled={isBusy}
                  >
                    {isBusy ? "Working..." : "Delete"}
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
                    disabled={isBusy}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* APPROVED SECTION */}
      <h3 style={{ marginTop: 22 }}>Approved Campaigns</h3>
      {approved.length === 0 ? (
        <div className="card cardPad">No approved campaigns.</div>
      ) : (
        <div className="grid">
          {approved.map((c) => {
            const isBusy = busyId === c.id;
            return (
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
                  <button
                    className="button buttonDanger"
                    onClick={() => handleDelete(c.id)}
                    disabled={isBusy}
                  >
                    {isBusy ? "Working..." : "Delete Approved"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}