import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import { APP_NAME } from "../utils/constants.js";
import { getFeaturedSchemes } from "../services/schemeService.js";
import { useEffect, useState } from "react";

function Home() {
  const [featuredSchemes, setFeaturedSchemes] = useState([]);

  useEffect(() => {
    getFeaturedSchemes()
      .then(setFeaturedSchemes)
      .catch(() => setFeaturedSchemes([]));
  }, []);

  return (
    <div className="page-grid">
      <section className="page-shell hero-grid">
        <div className="hero-copy stack">
          <span className="eyebrow">{APP_NAME} public benefits explorer</span>
          <h1>Find the right government scheme without the scavenger hunt.</h1>
          <p className="lead">
            Search welfare programs, check your eligibility, save useful
            schemes, and keep your citizen profile in one place.
          </p>

          <div className="hero-actions">
            <Link className="primary-link" to="/search">
              Start searching
            </Link>
            <Link className="secondary-link" to="/register">
              Create account
            </Link>
          </div>
        </div>

        <div className="info-card stack">
          <div className="section-title">
            <p className="eyebrow">Fast access</p>
            <h2>What you can do here</h2>
          </div>

          <div className="stacked-copy">
            <div className="meta-row">
              <span className="badge">Search by benefit</span>
              <span className="badge">Compare schemes</span>
              <span className="badge">Save favorites</span>
            </div>
            <p>
              Search the schemes published by the NCAA service and save the ones
              that fit your needs.
            </p>
          </div>

          <SearchBar value="" onSearch={() => {}} />
        </div>
      </section>

      <section className="page-shell">
        <div className="section-title">
          <p className="eyebrow">Featured schemes</p>
          <h2>Popular options to explore</h2>
        </div>

        <div className="scheme-grid">
          {featuredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
