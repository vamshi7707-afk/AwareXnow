import React, { useState } from "react";
import { createCampaign } from "../api/campaignApi";
import { auth } from "../firebase";

export default function CreateCampaignPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [donateUrl, setDonateUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    setMsg("");

    // quick visible checks
    if (!title.trim() || !description.trim()) {
      setMsg("Please fill all required fields.");
      return;
    }

    // confirm click is firing
    console.log("✅ Submit clicked");

    // check auth
    const user = auth.currentUser;
    console.log("Auth user:", user?.uid || "NO USER");

    setLoading(true);
    try {
      await createCampaign({
        title: title.trim(),
        description: description.trim(),
        donateUrl: donateUrl.trim(),
        imageFile,
      });

      setTitle("");
      setDescription("");
      setDonateUrl("");
      setImageFile(null);

      setMsg("✅ Campaign submitted for admin approval.");
    } catch (err) {
      console.error("❌ createCampaign failed:", err);

      // show best possible error text
      const text =
        err?.message ||
        err?.code ||
        (typeof err === "string" ? err : "Something went wrong");

      setMsg(`❌ ${text}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="centerPage">
      <div className="card cardPad centerCardWide">
        <h2 className="pageTitle">Create Campaign</h2>
        <p className="pageSubtitle">
          All campaigns require admin approval before appearing on the homepage.
        </p>

        <form onSubmit={handleSubmit} className="grid">
          <div>
            <div className="label">Campaign title</div>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <div className="label">Campaign description</div>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <div className="label">Donate link (optional)</div>
            <input
              className="input"
              value={donateUrl}
              onChange={(e) => setDonateUrl(e.target.value)}
            />
          </div>

          <div>
            <div className="label">Campaign image (optional)</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {imageFile ? (
              <div className="smallMuted" style={{ marginTop: 6 }}>
                Selected: {imageFile.name}
              </div>
            ) : null}
          </div>

          <button className="button buttonPrimary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Campaign"}
          </button>
        </form>

        {msg && <div className="msg">{msg}</div>}
      </div>
    </div>
  );
}