import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_SCHEMES } from "../utils/constants.js";

function Eligibility() {
  const [profile, setProfile] = useState({
    income: "",
    senior: false,
    student: false,
  });

  const eligibleSchemes = useMemo(() => {
    const income = Number(profile.income || 0);

    if (!income) {
      return [];
    }

    return DEMO_SCHEMES.filter((scheme) => {
      // Student-specific scheme
      if (scheme.requiresStudent && !profile.student) {
        return false;
      }

      // Senior-specific scheme
      if (scheme.requiresSenior && !profile.senior) {
        return false;
      }

      // Senior can also qualify for schemes that allow senior citizens
      if (
        scheme.category === "Health" &&
        profile.senior &&
        scheme.allowsSenior
      ) {
        return true;
      }

      // Check minimum income
      if (scheme.minIncome !== undefined && income < scheme.minIncome) {
        return false;
      }

      // Check maximum income
      if (scheme.maxIncome !== undefined && income > scheme.maxIncome) {
        return false;
      }

      return true;
    });
  }, [profile]);

  return (
    <section className="eligibility-page">
      {/* Eligibility page header */}
      <div className="eligibility-header">
        <p className="eyebrow">ELIGIBILITY CHECKER</p>

        <h1>
          Find schemes you're
          <span> eligible for.</span>
        </h1>

        <p>
          Tell us a little about yourself and we'll identify government schemes
          that may match your profile.
        </p>
      </div>

      {/* Eligibility form and results */}
      <div className="eligibility-layout">
        {/* Profile information form */}
        <div className="eligibility-form-card">
          <div className="eligibility-card-heading">
            <span className="eligibility-icon">✓</span>

            <div>
              <h2>Your profile</h2>
              <p>Provide basic information to check your eligibility.</p>
            </div>
          </div>

          <div className="eligibility-form">
            <label className="eligibility-field">
              <span>Annual household income</span>

              <div className="income-input">
                <span>₹</span>

                <input
                  type="number"
                  value={profile.income}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      income: event.target.value,
                    }))
                  }
                  placeholder="250000"
                />
              </div>

              <small>Enter your approximate annual household income.</small>
            </label>

            {/* Student eligibility option */}
            <label className="eligibility-option">
              <input
                type="checkbox"
                checked={profile.student}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    student: event.target.checked,
                  }))
                }
              />

              <span className="custom-checkbox"></span>

              <span>
                <strong>Student</strong>
                <small>I'm currently studying</small>
              </span>
            </label>

            {/* Senior citizen eligibility option */}
            <label className="eligibility-option">
              <input
                type="checkbox"
                checked={profile.senior}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    senior: event.target.checked,
                  }))
                }
              />

              <span className="custom-checkbox"></span>

              <span>
                <strong>Senior citizen</strong>
                <small>I'm a senior citizen</small>
              </span>
            </label>
          </div>
        </div>

        {/* Matching schemes */}
        <div className="eligibility-results-card">
          <div className="eligibility-results-heading">
            <div>
              <p className="eyebrow">YOUR MATCHES</p>
              <h2>Suggested schemes</h2>
            </div>

            <span className="eligibility-count">
              {eligibleSchemes.length} found
            </span>
          </div>

          {eligibleSchemes.length > 0 ? (
            <div className="eligibility-results">
              {eligibleSchemes.map((scheme) => (
                <div key={scheme.id} className="eligibility-result">
                  <div className="eligibility-result-icon">✓</div>

                  <div className="eligibility-result-content">
                    <h3>{scheme.title}</h3>
                    <p>{scheme.eligibility}</p>

                    <Link
                      className="eligibility-view-link"
                      to={`/schemes/${scheme.id}`}
                    >
                      View scheme →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state when no profile matches are found */
            <div className="eligibility-empty-state">
              <div className="eligibility-empty-icon">⌕</div>

              <h3>No matches yet</h3>

              <p>
                Enter your income or select your profile type to discover
                matching government schemes.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Eligibility;
