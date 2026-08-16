import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bookmark,
  User,
  ShieldCheck,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Saved Schemes",
    to: "/saved-schemes",
    icon: Bookmark,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: User,
  },
  {
    label: "Admin",
    to: "/admin",
    icon: ShieldCheck,
  },
];

function Sidebar() {
  return (
    <aside className="panel sidebar">
      <div className="section-title sidebar-heading">
        <p className="eyebrow">Quick links</p>
        <h2>Workspace</h2>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={2} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;