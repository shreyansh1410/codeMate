import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Feed() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Feed Page</h2>
            <p>
              This is a placeholder for the feed page. More content will be
              added later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
