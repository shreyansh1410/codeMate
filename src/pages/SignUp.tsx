import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { setLoading, setError } from "../store/authSlice";
import { register } from "../api/auth";
import type { RootState } from "../store/store";

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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

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
    try {
      dispatch(setLoading(true));
      const userData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        skills: formData.skills
          ? formData.skills.split(",").map((skill) => skill.trim())
          : [],
      };

      await register(userData);
      navigate("/login");
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-8 mt-20">
      <div className="card w-[400px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6 justify-center">
            Sign Up
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name *</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name (optional)"
                className="input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email *</span>
              </label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age (optional)"
                className="input input-bordered w-full"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender (optional)</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                <option value="prefer not to say">Prefer Not To Say</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. JavaScript, React, Node.js (optional)"
                className="input input-bordered w-full"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself (optional)"
                className="textarea textarea-bordered w-full"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full mt-6">
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Sign Up"
                )}
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
