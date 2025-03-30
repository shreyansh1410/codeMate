import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

function LandingPage() {
  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-100">
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/feed" element={<Feed />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
