import React from "react";
import "./SmallBusinessSection.css";

export default function SmallBusinessSection() {
  const businesses = [
    {
      id: 1,
      title: "FoodByUs",
      description:
        "A wholesale food marketplace connecting restaurants with local suppliers, offering fresh produce, meat, and pantry items.",
      url: "http://www.foodbyus.com.au/",
    },
    {
      id: 2,
      title: "Reliable Food Distributors",
      description:
        "Supplies fresh and frozen food products to restaurants, cafes, and catering businesses across Sydney.",
      url: "http://www.reliablefoods.com.au/",
    },
    {
      id: 3,
      title: "Sydney Food & Packaging Wholesalers Pty Ltd",
      description:
        "Provides food products along with packaging solutions for hospitality and food service businesses.",
      url: "http://www.sydfp.com.au/",
    },
    {
      id: 4,
      title: "RHS Steel Supplies",
      description:
        "A steel distributor supplying construction materials, metal products, and fabrication services.",
      url: "https://www.rhssteelsupplies.com.au/",
    },
    {
      id: 5,
      title: "Lawrence & Hanson Sydney",
      description:
        "Electrical supply vendor offering cables, lighting, and electrical equipment for contractors and businesses.",
      url: "https://www.lh.com.au/",
    },
    {
      id: 6,
      title: "Wholesale iD Australia - Sydney",
      description:
        "Supplies office accessories, ID solutions, and workplace products for businesses and organisations.",
      url: "https://www.wholesaleid.com.au/",
    },
  ];

  return (
    <div className="sb-wrap">
      <div className="sb-head">
        <h2>Small Businesses</h2>
        <p>Discover and support local businesses in the community.</p>
      </div>

      <div className="sb-grid">
        {businesses.map((b) => (
          <article className="sb-card" key={b.id}>
            <div className="sb-card__top">
              <h3>{b.title}</h3>
            </div>

            <p className="sb-card__desc">{b.description}</p>

            <div className="sb-card__actions">
              <a
                className="sb-btn"
                href={b.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}