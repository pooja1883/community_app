import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CommunityAbout.css";

const CommunityAbout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await fetch(
          `http://192.168.29.86:5001/api/communities/slug/${slug}`
        );
        const data = await res.json();
        setCommunity(data.data.community);
      } catch (error) {
        console.error("Fetch error:", error);
        setCommunity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [slug]);

  if (loading) return <p className="page-status">Loading...</p>;
  if (!community) return <p className="page-status">Community not found</p>;

  return (
    <div className="community-about-container">

      {/* 🔙 Back action */}
      <div className="page-action">
        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="community-about-card">
        {/* 🖼 Banner */}
        <img
          src={community.banner}
          alt={`${community.name} banner`}
          className="community-banner"
        />

        {/* 🧾 Header */}
        <div className="community-header">
          <h1 className="community-title">{community.name}</h1>
          <p className="community-description">{community.description}</p>
        </div>

        {/* 📊 Info Section */}
        <div className="community-info-grid">
          <div>
            <span className="info-label">Category</span>
            <span>{community.category}</span>
          </div>

          <div>
            <span className="info-label">Status</span>
            <span>{community.status}</span>
          </div>

          <div>
            <span className="info-label">Members</span>
            <span>{community.memberCount}</span>
          </div>

          <div>
            <span className="info-label">Courses</span>
            <span>{community.courseCount}</span>
          </div>

          <div>
            <span className="info-label">Pricing</span>
            <span>
              {community.pricing
                ? `${community.pricing.price} ${community.pricing.currency} / ${community.pricing.billingPeriod}`
                : "Free"}
            </span>
          </div>

          <div>
            <span className="info-label">Owner</span>
            <span>
              {community.ownerName} ({community.ownerEmail})
            </span>
          </div>
        </div>

        {/* ⭐ Features */}
        <div className="community-features">
          <h3>Features</h3>
          <p>
            {community.features
              ? Object.entries(community.features)
                  .filter(([_, v]) => v)
                  .map(([k]) => k)
                  .join(", ")
              : "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityAbout;
