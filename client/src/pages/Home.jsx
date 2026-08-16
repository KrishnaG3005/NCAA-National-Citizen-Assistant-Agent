import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import SchemeCard from "../components/SchemeCard.jsx";
import { DEMO_SCHEMES, APP_NAME } from "../utils/constants.js";

function Home() {
  const featuredSchemes = DEMO_SCHEMES.slice(0, 3);

  return (
    <div className="page-grid">
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">AI-POWERED CITIZEN ASSISTANCE</span>

          <h1>
            Find Government Schemes
            <span> You're Eligible For.</span>
          </h1>

          <p className="hero-description">
            Discover government welfare schemes, check your eligibility, and get
            personalized guidance through an intelligent citizen assistance
            platform.
          </p>

          <div className="hero-actions">
            <Link className="hero-primary-button" to="/search">
              Explore Schemes
              <span>→</span>
            </Link>

            <Link className="hero-secondary-button" to="/eligibility">
              Check Eligibility
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Verified Scheme Information</span>
            </div>

            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>AI-Powered Assistance</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="ai-card">
            <div className="ai-card-header">
              <div className="ai-avatar">✦</div>

              <div>
                <strong>Citizen Assistant</strong>
                <span>AI Scheme Recommendation</span>
              </div>

              <span className="online-dot"></span>
            </div>

            <div className="ai-question">
              <span>You</span>
              <p>I need financial assistance for my education.</p>
            </div>

            <div className="ai-response">
              <span>AI Assistant</span>

              <p>
                I found <strong>3 schemes</strong> that may match your
                requirements.
              </p>
            </div>

            <div className="scheme-match">
              <div>
                <span className="scheme-match-label">EDUCATION</span>
                <h3>Scholarship Assistance</h3>
                <p>Financial support for eligible students</p>
              </div>

              <span className="eligible-badge">✓ Match</span>
            </div>

            <div className="scheme-match">
              <div>
                <span className="scheme-match-label">STUDENT SUPPORT</span>
                <h3>Education Benefit Scheme</h3>
                <p>Government assistance for students</p>
              </div>

              <span className="eligible-badge">✓ Match</span>
            </div>

            <div className="ai-card-footer">
              <span>3 schemes matched</span>
              <Link to="/search">View all →</Link>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span>✓</span>
            <div>
              <strong>Eligibility Checked</strong>
              <small>Personalized results</small>
            </div>
          </div>

          <div className="floating-card floating-card-bottom">
            <span>✦</span>
            <div>
              <strong>AI Recommendation</strong>
              <small>Smart scheme matching</small>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / platform highlights */}
      <section className="stats-strip">
        <div className="stat-item">
          <strong>50+</strong>
          <span>Government Schemes</span>
        </div>

        <div className="stat-item">
          <strong>AI Powered</strong>
          <span>Smart Scheme Matching</span>
        </div>

        <div className="stat-item">
          <strong>Fast</strong>
          <span>Eligibility Assistance</span>
        </div>

        <div className="stat-item">
          <strong>Citizen First</strong>
          <span>Simple &amp; Accessible</span>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="page-shell">
        <div className="section-title scheme-section-heading">
          <div>
            <p className="eyebrow">FEATURED SCHEMES</p>
            <h2>Explore popular government benefits</h2>
          </div>

          <Link className="view-all-link" to="/search">
            View all schemes →
          </Link>
        </div>

        <div className="scheme-grid">
          {featuredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="how-it-works-heading">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>Get the right government support in three simple steps</h2>
          <p>
            Find relevant schemes without navigating through complicated
            government portals.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>

            <div className="step-icon">◎</div>

            <h3>Tell us about yourself</h3>

            <p>
              Share basic information about your profile, needs, and
              preferences.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>

            <div className="step-icon">✓</div>

            <h3>Check your eligibility</h3>

            <p>
              Our platform evaluates available criteria to identify schemes that
              may match your profile.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>

            <div className="step-icon">✦</div>

            <h3>Discover your schemes</h3>

            <p>
              Explore personalized recommendations and view detailed scheme
              information.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="cta-section">
        <div className="cta-content">
          <p className="eyebrow">READY TO GET STARTED?</p>

          <h2>Find the government support you're eligible for.</h2>

          <p>
            Explore available schemes or check your eligibility to discover
            benefits that match your needs.
          </p>

          <div className="cta-actions">
            <Link className="cta-primary-button" to="/search">
              Explore Schemes
              <span>→</span>
            </Link>

            <Link className="cta-secondary-button" to="/eligibility">
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
