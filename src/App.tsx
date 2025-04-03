import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Chat from "./pages/Chat";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Guidelines from "./pages/Guidelines";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import ProtectedRoute from "./components/ProtectedRoute";
import Body from "./components/Body";
import ScrollToTop from "./components/ScrollToTop";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import { Toaster } from "react-hot-toast";

function LandingPage() {
  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}

function HomeRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If user is authenticated, redirect to feed page
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  // Otherwise show landing page
  return <LandingPage />;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-base-100">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route element={<Body />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <Connections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:targetUserId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          {/* Legal pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/guidelines" element={<Guidelines />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
