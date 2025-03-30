import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, clearAuth } from "../store/authSlice";
import { logout } from "../api/auth";
import type { RootState } from "../store/store";

export default function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

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

  return (
    <div className="min-h-screen bg-base-200 p-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
          <button
            className="btn btn-primary"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Logout"
            )}
          </button>
        </div>

        <div className="bg-base-100 rounded-box p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Name:</label>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <label className="font-medium">Email:</label>
              <p>{user?.emailId}</p>
            </div>
            {user?.age && (
              <div>
                <label className="font-medium">Age:</label>
                <p>{user.age}</p>
              </div>
            )}
            {user?.gender && (
              <div>
                <label className="font-medium">Gender:</label>
                <p>{user.gender}</p>
              </div>
            )}
            {user?.skills && user.skills.length > 0 && (
              <div>
                <label className="font-medium">Skills:</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {user?.bio && (
              <div>
                <label className="font-medium">Bio:</label>
                <p className="mt-1">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
