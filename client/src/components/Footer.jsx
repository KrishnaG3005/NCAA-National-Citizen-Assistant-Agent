import { Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants.js";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner footer-content">
        {/* Brand and project description */}
        <div className="footer-brand">
          <Link className="footer-logo" to="/">
            <span className="footer-logo-mark">
              {APP_NAME.slice(0, 1)}
            </span>

            <span>{APP_NAME}</span>
          </Link>

          <p>
            An AI-powered citizen assistance platform that helps people
            discover government schemes and understand their eligibility.
          </p>
        </div>

        {/* Navigation links */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link className="footer-link" to="/search">
            Search schemes
          </Link>

          <Link className="footer-link" to="/eligibility">
            Check eligibility
          </Link>

          <Link className="footer-link" to="/register">
            Create account
          </Link>
        </div>

        {/* Platform information */}
        <div className="footer-column">
          <h3>Platform</h3>

          <span className="footer-text">AI-powered assistance</span>
          <span className="footer-text">Eligibility matching</span>
          <span className="footer-text">Citizen focused</span>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>

          <span>Built to make government benefits easier to discover.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;