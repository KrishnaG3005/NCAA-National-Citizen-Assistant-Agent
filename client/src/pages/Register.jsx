import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await register(form);
      toast.success("Account created.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to register.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="page-shell auth-card"
      style={{ maxWidth: 560, margin: "0 auto" }}
    >
      <div className="section-title">
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>
        <p>Save schemes, track progress, and personalize your profile.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="form-row">
          <span className="label">Full name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Aarav Citizen"
            required
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
            placeholder="citizen@example.com"
            required
          />
        </label>

        <label className="form-row">
          <span className="label">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            placeholder="Create a strong password"
            required
          />
        </label>

        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Creating account…" : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link className="text-link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
