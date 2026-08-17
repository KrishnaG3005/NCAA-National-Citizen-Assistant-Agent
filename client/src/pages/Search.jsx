import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import { searchSchemes, saveScheme } from "../services/schemeService.js";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let active = true;

    searchSchemes(query).then((items) => {
      if (active) {
        setResults(items);
      }
    });

    return () => {
      active = false;
    };
  }, [query]);

  const handleSearch = (value) => {
    const next = value.trim();
    setQuery(next);
    setSearchParams(next ? { q: next } : {});
  };

  return (
    <section className="search-page">

      {/* Search page header */}
      <div className="search-page-header">
        <div>
          <p className="eyebrow">SEARCH GOVERNMENT SCHEMES</p>

          <h1>
            Find schemes that
            <span> match your needs.</span>
          </h1>

          <p className="search-page-description">
            Search government welfare programs by keyword, benefit,
            category, or your specific needs.
          </p>
        </div>
      </div>

      {/* Main search area */}
      <div className="search-panel">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />

        <div className="search-suggestions">
          <span>Popular searches:</span>

          <button
            type="button"
            onClick={() => handleSearch("education")}
          >
            Education
          </button>

          <button
            type="button"
            onClick={() => handleSearch("health")}
          >
            Health
          </button>

          <button
            type="button"
            onClick={() => handleSearch("women")}
          >
            Women
          </button>

          <button
            type="button"
            onClick={() => handleSearch("housing")}
          >
            Housing
          </button>
        </div>
      </div>

      {/* Search results */}
      <div className="search-results-section">

        <div className="search-results-header">
          <div>
            <p className="eyebrow">RESULTS</p>

            <h2>
              {query
                ? `Schemes matching "${query}"`
                : "Explore available schemes"}
            </h2>
          </div>

          <span className="results-count">
            {results.length} schemes found
          </span>
        </div>

        {results.length > 0 ? (
          <div className="scheme-grid">
            {results.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSave={async (schemeId) => {
                  await saveScheme(schemeId);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty search state */
          <div className="search-empty-state">
            <div className="search-empty-icon">⌕</div>

            <h3>No schemes found</h3>

            <p>
              Try a broader keyword such as
              <strong> education</strong>,
              <strong> health</strong>, or
              <strong> housing</strong>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;