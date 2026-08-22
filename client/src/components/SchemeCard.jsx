import { Link } from "react-router-dom";

function SchemeCard({ scheme, saved = false, onSave, onRemove }) {
  if (!scheme) {
    return null;
  }

  return (
    <article className="scheme-card">
      <div className="meta-row">
        <span className="badge">{scheme.category}</span>
        <span className="badge">
          {scheme.region || scheme.state || "National"}
        </span>
      </div>

      <div>
        <h3>{scheme.title}</h3>
        <p className="card-copy">{scheme.summary || scheme.description}</p>
      </div>

      <div className="scheme-tags">
        {(scheme.benefits ?? []).slice(0, 3).map((benefit) => (
          <span className="tag" key={benefit}>
            {benefit}
          </span>
        ))}
      </div>

      <p className="scheme-meta">{scheme.eligibility}</p>

      <div className="card-actions">
        <Link className="primary-link" to={`/schemes/${scheme.id}`}>
          View details
        </Link>

        {saved ? (
          <button
            type="button"
            className="secondary-link"
            onClick={() => onRemove?.(scheme.id)}
          >
            Remove saved
          </button>
        ) : (
          <button
            type="button"
            className="secondary-link"
            onClick={() => onSave?.(scheme.id)}
          >
            Save scheme
          </button>
        )}
      </div>
    </article>
  );
}

export default SchemeCard;
