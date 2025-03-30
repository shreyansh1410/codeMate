import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    skills: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = {
        ...formData,
        age: parseInt(formData.age),
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };

      await register(userData);
      navigate("/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Sign Up
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="input input-bordered"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="input input-bordered"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter your email"
                className="input input-bordered"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                className="input input-bordered"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                className="select select-bordered"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Skills (comma-separated)</span>
              </label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. JavaScript, React, Node.js"
                className="input input-bordered"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/signin" className="link link-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
