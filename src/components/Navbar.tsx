import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setError, setLoading } from "../store/authSlice";
import { logout } from "../api/auth";
import type { RootState } from "../store/store";
import logo from "/codemate_logo.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-base-100/50 border-b border-white/5">
      <div className="content-container h-full flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <img src={logo} alt="CodeMate" className="h-6 w-6" />
          <span className="font-medium">CodeMate</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary hover:border-primary/80 transition-colors focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://ui-avatars.com/api/?name=" + user?.firstName
                  }
                  alt={user?.firstName}
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-200 rounded-lg shadow-xl py-2 border border-white/5">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-base-300 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/connections"
                    className="block px-4 py-2 hover:bg-base-300 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My connections
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-base-300 transition-colors text-error"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-primary transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
