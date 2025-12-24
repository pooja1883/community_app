import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import "./community.css";

const CommunityGrid = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch communities from API
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch("http://192.168.29.86:5001/api/communities");
        const result = await res.json();

        setData(result.communities || []); 

        const apiCategories = [
          ...new Set((result.communities || []).map((item) => item.category)),
        ];
        setCategories(["All", ...apiCategories]);

        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Filter communities based on search and category
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, search, activeCategory]);

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="card_section">
      <section className="search-section">
        {/* Search Bar */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search Communities..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton className="search-icon-btn">
            <SearchIcon />
          </IconButton>
        </div>

        {/* Category Filters */}
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="cards">
          {loading ? (
            <p>Loading...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.subdomain || item._id}
                className="card"
                onClick={() => {
                  const slug = item.subdomain; // use subdomain as slug
                  if (isAuthenticated) {
                    navigate(`/community/${slug}`);
                  } else {
                    navigate("/login", { state: { from: `/community/${slug}` } });
                  }
                }}
              >
                <div>
                  <span className="category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <h6>{item.description}</h6>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunityGrid;
