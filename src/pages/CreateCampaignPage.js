import React, { useState } from "react";
import { createCampaign } from "../api/campaignApi";

export default function CreateCampaignPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [donateUrl, setDonateUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!title || !description) {
      setMsg("Please fill all required fields.");
      return;
    }

    try {
      await createCampaign({
        title,
        description,
        donateUrl,
        imageFile,
      });

      setTitle("");
      setDescription("");
      setDonateUrl("");
      setImageFile(null);
      setMsg("Campaign submitted for admin approval.");
    } catch (e) {
      setMsg(e.message);
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
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div>
            <div className="label">Campaign description</div>
            <textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div>
            <div className="label">Donate link (optional)</div>
            <input className="input" value={donateUrl} onChange={e => setDonateUrl(e.target.value)} />
          </div>

          <div>
            <div className="label">Campaign image (optional)</div>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
          </div>

          <button className="button buttonPrimary">Submit Campaign</button>
        </form>

        {msg && <div className="msg">{msg}</div>}
      </div>
    </div>
  );
}
