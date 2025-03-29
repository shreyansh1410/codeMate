import { Users, Rocket, MessageSquare, Target } from "lucide-react";

const features = [
  {
    title: "Team Matching",
    description:
      "Find the perfect teammates based on skills, interests, and project goals using our advanced matching algorithm.",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Project Launch",
    description:
      "Launch your projects with confidence. Get the resources and support you need to turn ideas into reality.",
    icon: Rocket,
    color: "text-secondary",
  },
  {
    title: "Real-time Collaboration",
    description:
      "Seamless communication and collaboration tools to keep your team connected and productive.",
    icon: MessageSquare,
    color: "text-accent",
  },
  {
    title: "Skill Matching",
    description:
      "Connect with developers who complement your skills and share your vision.",
    icon: Target,
    color: "text-success",
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl font-bold mb-4">
            Build Your Dream Team
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            Everything you need to find the right teammates and build successful
            projects together.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200/50 backdrop-blur-sm hover:bg-base-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className={`${feature.color} mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="card-title font-['Instrument_Serif'] text-xl">
                  {feature.title}
                </h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
