import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
