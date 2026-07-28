import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";

function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser(form);
    toast.success("Profile updated.");
  };

  return (
    <section
      className="page-shell stack"
      style={{ maxWidth: 720, margin: "0 auto" }}
    >
      <div className="section-title">
        <p className="eyebrow">Profile</p>
        <h1>Your citizen account</h1>
      </div>

      <div className="info-card">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="form-row">
          <span className="label">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />
        </label>

        <label className="form-row">
          <span className="label">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>

        <button className="auth-button" type="submit">
          Save changes
        </button>
      </form>
    </section>
  );
}

export default Profile;
