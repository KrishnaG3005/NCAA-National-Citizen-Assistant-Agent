import { useState } from "react";
import { checkEligibility } from "../services/eligibilityService.js";

function Eligibility() {
  const [profile, setProfile] = useState({
    annualIncome: "",
    age: "",
    gender: "",
    state: "",
    category: "",
  });
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = async (event) => {
    event.preventDefault();
    const schemes = await checkEligibility(profile);
    setEligibleSchemes(schemes);
    setChecked(true);
  };

  return (
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Eligibility checker</p>
        <h1>See likely matches in seconds</h1>
      </div>

      <div className="two-column-grid">
        <form className="info-card stack" onSubmit={handleCheck}>
          <label className="form-row">
            <span className="label">Annual household income</span>
            <input
              type="number"
              value={profile.annualIncome}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  annualIncome: event.target.value,
                }))
              }
              placeholder="250000"
            />
          </label>

          <label className="form-row">
            <span className="label">Age</span>
            <input
              type="number"
              value={profile.age}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  age: event.target.value,
                }))
              }
            />
          </label>
          <button className="auth-button" type="submit">
            Check eligibility
          </button>
        </form>

        <div className="info-card stack">
          <h2>Suggested schemes</h2>
          {checked &&
            eligibleSchemes.map((scheme) => (
              <div key={scheme._id || scheme.id} className="panel">
                <strong>{scheme.title}</strong>
                <p>{scheme.eligibility}</p>
              </div>
            ))}
          {checked && eligibleSchemes.length === 0 && (
            <p>No matching schemes found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Eligibility;
