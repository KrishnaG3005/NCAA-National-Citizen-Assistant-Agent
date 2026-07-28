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
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Search schemes</p>
        <h1>Look up programs by keyword, benefit, or category</h1>
      </div>

      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      <div className="scheme-grid">
        {results.length > 0 ? (
          results.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onSave={async (schemeId) => {
                await saveScheme(schemeId);
              }}
            />
          ))
        ) : (
          <div className="empty-state">
            <h2>No schemes found</h2>
            <p>Try a broader keyword like “education” or “health”.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
