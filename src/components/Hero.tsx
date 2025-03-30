import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden mt-20">
      <div className="absolute inset-0 spotlight" />

      <div className="content-container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex mb-4">
            <p className="text-4xl font-medium text-primary animate-typing">
              The{" "}
              <span className="font-['Instrument_Serif'] font-style: italic font-light">
                future
              </span>{" "}
              of team building
            </p>
          </div>

          <h1 className="text-8xl font-['Instrument_Serif'] mb-6 animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mix-blend-overlay">
            Connect with exceptional developers
          </h1>

          <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
            Join a thriving community of innovators. Build your dream team,
            collaborate on groundbreaking projects, and shape the future of
            software development.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="btn btn-primary gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-ghost gap-2">
              Learn more
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 text-center">
            {[
              ["10K+", "Active Developers"],
              ["1000+", "Teams Formed"],
              ["95%", "Success Rate"],
            ].map(([number, label]) => (
              <div key={label}>
                <div className="text-2xl font-medium mb-1">{number}</div>
                <div className="text-sm text-base-content/60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
