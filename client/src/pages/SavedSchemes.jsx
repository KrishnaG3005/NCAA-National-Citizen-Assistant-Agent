import { useEffect, useState } from "react";
import SchemeCard from "../components/SchemeCard.jsx";
import {
  getSavedSchemes,
  removeSavedScheme,
} from "../services/schemeService.js";

function SavedSchemes() {
  const [savedSchemes, setSavedSchemes] = useState([]);

  useEffect(() => {
    let active = true;

    getSavedSchemes().then((items) => {
      if (active) {
        setSavedSchemes(items);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const handleRemove = async (schemeId) => {
    const updated = await removeSavedScheme(schemeId);
    setSavedSchemes(updated);
  };

  return (
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Saved schemes</p>
        <h1>Your bookmarked programs</h1>
      </div>

      <div className="scheme-grid">
        {savedSchemes.length > 0 ? (
          savedSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              saved
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="empty-state">
            <h2>No saved schemes yet</h2>
            <p>Save a few programs from search results to keep them here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedSchemes;
