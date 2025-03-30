import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setUser, clearAuth } from "../store/authSlice";
import { logout } from "../api/auth";
import type { RootState } from "../store/store";
import { toast } from "react-hot-toast";
import UserCard from "../components/Card";

interface UpdateFormData {
  firstName: string;
  lastName: string;
  gender: string;
  skills: string[];
  bio: string;
  age: number | "";
  photoURL: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<UpdateFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    skills: user?.skills || [],
    bio: user?.bio || "",
    age: user?.age || "",
    photoURL: user?.photoURL || "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [error, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender || "",
        skills: user.skills || [],
        bio: user.bio || "",
        age: user.age || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await logout();
      dispatch(clearAuth());
      navigate("/");
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()],
        });
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Mock functions for the UserCard component - these won't be used when showActions is false
  const handleInterested = (userId: string) => {
    console.log("Interested in user:", userId);
  };

  const handleIgnore = (userId: string) => {
    console.log("Ignored user:", userId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      dispatch(setUser(data.user));
      toast.success("Profile updated successfully!");
    } catch (error) {
      setFormError((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            {user && (
              <div className="h-96">
                <UserCard 
                  user={{
                    _id: user._id || "preview",
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    bio: formData.bio,
                    photoURL: formData.photoURL,
                    skills: formData.skills,
                    age: formData.age ? Number(formData.age) : undefined,
                    gender: formData.gender
                  }}
                  onInterested={handleInterested}
                  onIgnore={handleIgnore}
                  showActions={false}
                />
              </div>
            )}

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2 card-title">Account Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">Email:</span>
                    <span>{user?.emailId}</span>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-error w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-base-100 rounded-box shadow-xl">
              <div className="p-6 border-b border-base-300">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
              </div>
              
              <div className="p-6">
                {error && (
                  <div className="alert alert-error mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-medium text-base-content/70 text-sm uppercase tracking-wider">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Last Name</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Age</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            age: e.target.value ? parseInt(e.target.value) : "",
                          })
                        }
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <select
                        className="select select-bordered focus:select-primary w-full"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="divider"></div>
                  <h3 className="font-medium text-base-content/70 text-sm uppercase tracking-wider">Profile Details</h3>

                  <div className="form-control w-full">
                      <div className="label-text w-full">Profile Picture URL</div>
     
                    <input
                      type="url"
                      className="input input-bordered focus:input-primary w-full"
                      value={formData.photoURL}
                      onChange={(e) =>
                        setFormData({ ...formData, photoURL: e.target.value })
                      }
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>

                  <div className="form-control">
                      <div className="label-text">Bio</div>
            
                    <textarea
                      className="textarea textarea-bordered h-24 focus:textarea-primary w-full"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      maxLength={100}
                    />
                    <label className="label">
                      <span className="label-text-alt">{formData.bio.length}/100 characters</span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Skills</span>
                      <span className="label-text-alt text-primary">First 3 shown on your card</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered w-full focus:input-primary"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Type a skill and press Enter"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-primary gap-1 px-3 py-3"
                        >
                          {skill}
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs btn-circle"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-control mt-8">
                    <button
                      className="btn btn-primary w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}