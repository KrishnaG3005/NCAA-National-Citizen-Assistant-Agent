import { Link } from "react-router-dom";

function SchemeCard({ scheme, saved = false, onSave, onRemove }) {
  if (!scheme) {
    return null;
  }

  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <div className="scheme-card-badges">
          <span className="scheme-category">{scheme.category}</span>
          <span className="scheme-region">{scheme.region}</span>
        </div>

        <span className="scheme-arrow">↗</span>
      </div>

      <div className="scheme-card-content">
        <h3>{scheme.title}</h3>

        <p className="card-copy">{scheme.summary}</p>
      </div>

      <div className="scheme-tags">
        {(scheme.benefits ?? []).slice(0, 3).map((benefit) => (
          <span className="tag" key={benefit}>
            {benefit}
          </span>
        ))}
      </div>

      <div className="scheme-eligibility">
        <span className="eligibility-label">ELIGIBILITY</span>
        <p>{scheme.eligibility}</p>
      </div>

      <div className="card-actions">
        <Link
          className="primary-link"
          to={`/schemes/${scheme.id}`}
        >
          View details
          <span>→</span>
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