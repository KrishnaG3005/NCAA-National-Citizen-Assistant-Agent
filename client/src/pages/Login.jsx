import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(form);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to log in.");
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
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <p>Access your saved schemes, profile, and dashboard tools.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
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
            placeholder="••••••••"
            required
          />
        </label>

        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Login"}
        </button>

        <p>
          New here?{" "}
          <Link className="text-link" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
