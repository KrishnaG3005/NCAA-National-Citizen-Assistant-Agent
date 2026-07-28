import { Link, NavLink } from "react-router-dom";
import { APP_NAME } from "../utils/constants.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Search", to: "/search" },
  { label: "Eligibility", to: "/eligibility" },
  { label: "Dashboard", to: "/dashboard", protected: true },
];

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">{APP_NAME.slice(0, 1)}</span>
          <span>
            {APP_NAME}
            <span className="helper-text"> citizen assistant</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {user?.name || "Profile"}
              </NavLink>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
