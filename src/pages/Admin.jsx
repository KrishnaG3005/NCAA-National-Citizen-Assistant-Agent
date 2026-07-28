import { useAuth } from "../contexts/AuthContext.jsx";

function Admin() {
  const { user } = useAuth();

  return (
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Admin</p>
        <h1>Administration console</h1>
      </div>

      {user?.role === "admin" ? (
        <div className="stats-grid">
          <div className="info-card">
            <span className="badge">Overview</span>
            <strong>Manage content</strong>
            <p className="muted">
              This area is ready for dashboards, moderation, and scheme
              management tools.
            </p>
          </div>
          <div className="info-card">
            <span className="badge">Users</span>
            <strong>Role-based access</strong>
            <p className="muted">
              Only admin-tagged demo accounts can open this route.
            </p>
          </div>
          <div className="info-card">
            <span className="badge">API</span>
            <strong>Future integrations</strong>
            <p className="muted">
              Hook this page into your admin endpoints when they are available.
            </p>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Access denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      )}
    </section>
  );
}

export default Admin;
