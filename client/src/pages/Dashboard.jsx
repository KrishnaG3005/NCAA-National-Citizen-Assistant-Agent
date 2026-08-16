import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { getSavedSchemes } from "../services/schemeService.js";

function Dashboard() {
  const { user } = useAuth();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    let active = true;

    getSavedSchemes().then((schemes) => {
      if (active) {
        setSavedCount(schemes.length);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="page-shell stack">
        <div className="section-title">
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
          <p>
            Manage your schemes, profile, and any future API-powered tools from
            one place.
          </p>
        </div>

        <div className="stats-grid">
          <div className="info-card">
            <span className="badge">Saved schemes</span>
            <strong>{savedCount}</strong>
            <p className="muted">
              Schemes you have bookmarked for later review.
            </p>
          </div>
          <div className="info-card">
            <span className="badge">Role</span>
            <strong>{user?.role || "citizen"}</strong>
            <p className="muted">Access level for this demo account.</p>
          </div>
          <div className="info-card">
            <span className="badge">Next step</span>
            <strong>Search more schemes</strong>
            <p className="muted">
              Keep exploring programs that fit your needs.
            </p>
          </div>
        </div>

        <div className="hero-actions">
          <Link className="primary-link" to="/search">
            Search schemes
          </Link>
          <Link className="secondary-link" to="/saved-schemes">
            View saved schemes
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
