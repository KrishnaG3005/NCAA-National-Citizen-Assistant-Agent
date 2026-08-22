import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    district: "",
    gender: "",
    dob: "",
    occupation: "",
    annualIncome: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      console.log("Register data:", formData);

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        gender: formData.gender,
        dob: formData.dob,
        occupation: formData.occupation,
        annualIncome: Number(formData.annualIncome) || 0,
        category: formData.category,
      });
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Aarav Citizen"
            required
          />
        </label>

        <label className="form-row">
          <span className="label">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="citizen@example.com"
            required
          />
        </label>

        <label className="form-row">
          <span className="label">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />
        </label>

        <label className="form-row">
          <span className="label">Phone</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
        </label>

        <label className="form-row">
          <span className="label">State</span>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Uttar Pradesh"
          />
        </label>

        <label className="form-row">
          <span className="label">District</span>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Unnao"
          />
        </label>

        <label className="form-row">
          <span className="label">Gender</span>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Male"
          />
        </label>

        <label className="form-row">
          <span className="label">Date of birth</span>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>

        <label className="form-row">
          <span className="label">Occupation</span>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Student"
          />
        </label>

        <label className="form-row">
          <span className="label">Annual income</span>
          <input
            type="number"
            min="0"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            placeholder="100000"
          />
        </label>

        <label className="form-row">
          <span className="label">Category</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="General"
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
