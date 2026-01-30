import { useParams, Link } from "react-router-dom";
import { campaigns } from "../data/campaigns";

export default function CampaignDetails() {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) return <h2>Campaign not found</h2>;

  return (
    <div className="container">
      <Link to="/">← Back</Link>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <button className="btnPrimary">Participate</button>
    </div>
  );
}
