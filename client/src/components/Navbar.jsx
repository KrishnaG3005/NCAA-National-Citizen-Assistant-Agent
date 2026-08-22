import { Link, NavLink } from "react-router-dom";
import { Menu, X, MessageCircle, Search, UserCheck } from "lucide-react";
import { useState } from "react";
import { APP_NAME } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Logo */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-mark">🏛️</div>

          <div className="brand-text">
            <h2>{APP_NAME}</h2>
            <span>National Citizen Assistant</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Home */}
          <NavLink to="/" className={navClass} onClick={closeMenu}>
            Home
          </NavLink>

          {/* Scheme Search */}
          <NavLink to="/search" className={navClass} onClick={closeMenu}>
            <Search size={17} />
            <span>Schemes</span>
          </NavLink>

          {/* AI Assistant */}
          <NavLink to="/chat" className={navClass} onClick={closeMenu}>
            <MessageCircle size={17} />
            <span>AI Assistant</span>
          </NavLink>

          {/* Eligibility */}
          <NavLink to="/eligibility" className={navClass} onClick={closeMenu}>
            <UserCheck size={17} />
            <span>Eligibility</span>
          </NavLink>

          {/* Authenticated User */}
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass} onClick={closeMenu}>
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className="profile-link"
                onClick={closeMenu}
              >
                <div className="user-avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span>{user?.name || "Profile"}</span>
              </NavLink>

              <button
                type="button"
                className="logout-btn"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Guest */}
              <NavLink to="/login" className={navClass} onClick={closeMenu}>
                Login
              </NavLink>

              <Link to="/register" className="register-btn" onClick={closeMenu}>
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
