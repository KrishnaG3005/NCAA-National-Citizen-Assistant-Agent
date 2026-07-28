import { NavLink } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved schemes", to: "/saved-schemes" },
  { label: "Profile", to: "/profile" },
  { label: "Admin", to: "/admin" },
];

function Sidebar() {
  return (
    <aside className="panel sidebar">
      <div className="section-title">
        <p className="eyebrow">Quick links</p>
        <h2>Workspace</h2>
      </div>

      {sidebarItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
