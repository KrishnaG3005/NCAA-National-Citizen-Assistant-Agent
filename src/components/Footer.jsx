import { Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants.js";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Built to help citizens find
          the right scheme faster.
        </p>
        <div className="inline-list">
          <Link className="footer-link" to="/search">
            Search schemes
          </Link>
          <Link className="footer-link" to="/eligibility">
            Check eligibility
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
