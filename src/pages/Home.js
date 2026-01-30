import { Link } from "react-router-dom";
import { campaigns } from "../data/campaigns";

export default function Home() {
  return (
    <div className="container">
      <h1>Campaigns</h1>
      <div className="grid">
        {campaigns.map((c) => (
          <div key={c.id} className="card">
            <div className="pill">{c.category}</div>
            <h3>{c.title}</h3>
            <p>{c.summary}</p>
            <Link className="btn" to={`/campaign/${c.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
