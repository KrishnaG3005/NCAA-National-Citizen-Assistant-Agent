import { useMemo, useState } from "react";
import { DEMO_SCHEMES } from "../utils/constants.js";

function Eligibility() {
  const [profile, setProfile] = useState({
    income: "",
    senior: false,
    student: false,
  });

  const eligibleSchemes = useMemo(() => {
    const income = Number(profile.income || 0);

    return DEMO_SCHEMES.filter((scheme) => {
      if (scheme.category === "Education" && profile.student) {
        return true;
      }

      if (scheme.category === "Welfare" && profile.senior) {
        return true;
      }

      return income > 0 && income < 300000;
    });
  }, [profile]);

  return (
    <section className="page-shell stack">
      <div className="section-title">
        <p className="eyebrow">Eligibility checker</p>
        <h1>See likely matches in seconds</h1>
      </div>

      <div className="two-column-grid">
        <div className="info-card stack">
          <label className="form-row">
            <span className="label">Annual household income</span>
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
          </label>

          <label className="form-row">
            <span className="label">
              <input
                type="checkbox"
                checked={profile.student}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    student: event.target.checked,
                  }))
                }
              />{" "}
              Student
            </span>
          </label>

          <label className="form-row">
            <span className="label">
              <input
                type="checkbox"
                checked={profile.senior}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    senior: event.target.checked,
                  }))
                }
              />{" "}
              Senior citizen
            </span>
          </label>
        </div>

        <div className="info-card stack">
          <h2>Suggested schemes</h2>
          {eligibleSchemes.map((scheme) => (
            <div key={scheme.id} className="panel">
              <strong>{scheme.title}</strong>
              <p>{scheme.eligibility}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Eligibility;
