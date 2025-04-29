import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setError, setLoading } from "../store/authSlice";
import { logout } from "../api/auth";
import type { RootState } from "../store/store";
import logo from "/codemate_logo.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const isPublicPage = ["/", "/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-base-100/50 border-b border-white/5">
        <div className="content-container h-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <img src={logo} alt="CodeMate" className="h-6 w-6" />
            <span className="font-medium">CodeMate</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center justify-center">
              <ThemeToggle />
              {!isPublicPage && (
                <button
                  className="p-2 focus:outline-none"
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        isSidebarOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16M4 18h16"
                      }
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative flex items-center">
                  <ThemeToggle />
                  <div>
                    <Link
                      to="/premium"
                      className="block px-4 py-2 hover:bg-base-300 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Buy Premium ⭐
                    </Link>
                  </div>
                  <button
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary hover:border-primary/80 transition-colors focus:outline-none hover:cursor-pointer"
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
                    <div className="absolute right-0 top-11 mt-2 w-48 bg-base-200 rounded-lg shadow-xl py-2 border border-white/5">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-base-300 transition-colors hover:cursor-pointer"
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
                      <Link
                        to="/requests"
                        className="block px-4 py-2 hover:bg-base-300 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Received Requests
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-base-300 transition-colors text-error hover:cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <ThemeToggle />
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
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="h-16 w-full bg-base-500 md:hidden"></div>

      {isMobile && !isPublicPage && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSidebar}
          ></div>

          <div
            className={`absolute top-0 right-0 h-full w-64 bg-base-200 shadow-xl transition-transform duration-300 transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 pt-16 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6"></div>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                      <img
                        src={
                          user?.photoURL ||
                          "https://ui-avatars.com/api/?name=" + user?.firstName
                        }
                        alt={user?.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-sm opacity-70 truncate">
                        {user?.emailId}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="p-3 hover:bg-base-300 rounded-lg transition-colors"
                      onClick={closeSidebar}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/connections"
                      className="p-3 hover:bg-base-300 rounded-lg transition-colors"
                      onClick={closeSidebar}
                    >
                      My connections
                    </Link>
                    <Link
                      to="/requests"
                      className="p-3 hover:bg-base-300 rounded-lg transition-colors"
                      onClick={closeSidebar}
                    >
                      Received Requests
                    </Link>
                    <Link
                      to="/premium"
                      className="p-3 hover:bg-base-300 rounded-lg transition-colors"
                      onClick={closeSidebar}
                    >
                      Buy Premium ⭐
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      closeSidebar();
                    }}
                    className="mt-auto p-3 text-error hover:bg-base-300 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/login"
                    className="w-full py-3 text-center bg-base-300 hover:bg-base-300/80 rounded-lg transition-colors"
                    onClick={closeSidebar}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-3 text-center bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={closeSidebar}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
