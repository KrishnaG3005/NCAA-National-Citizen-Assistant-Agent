import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SchemeCard from "../components/SchemeCard.jsx";
import {
  getSchemeById,
  isSchemeSaved,
  removeSavedScheme,
  saveScheme,
} from "../services/schemeService.js";

function SchemeDetails() {
  const { schemeId } = useParams();
  const [scheme, setScheme] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([getSchemeById(schemeId), isSchemeSaved(schemeId)]).then(
      ([loadedScheme, savedState]) => {
        if (active) {
          setScheme(loadedScheme);
          setSaved(savedState);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [schemeId]);

  const toggleSave = async () => {
    if (!scheme) {
      return;
    }

    if (saved) {
      await removeSavedScheme(scheme.id);
      setSaved(false);
      toast.success("Scheme removed from saved list.");
      return;
    }

    await saveScheme(scheme.id);
    setSaved(true);
    toast.success("Scheme saved.");
  };

  if (!scheme) {
    return (
      <section className="page-shell route-state">
        <div>
          <h1>Scheme not found</h1>
          <p>The requested scheme could not be loaded.</p>
          <Link className="primary-link" to="/search">
            Back to search
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Scheme details</p>
        <h1>{scheme.title}</h1>
      </div>

      <SchemeCard
        scheme={scheme}
        saved={saved}
        onSave={() => {}}
        onRemove={() => {}}
      />

      <div className="info-card">
        <h2>More information</h2>
        <p>{scheme.summary}</p>
        <p>{scheme.eligibility}</p>
        <div className="hero-actions">
          <button type="button" className="primary-link" onClick={toggleSave}>
            {saved ? "Unsave scheme" : "Save scheme"}
          </button>
          <Link className="secondary-link" to="/search">
            Browse more schemes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SchemeDetails;
