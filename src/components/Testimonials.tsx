const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "Found my dream team through CodeMate. The matching algorithm is spot-on!",
  },
  {
    name: "Alex Rivera",
    role: "Frontend Engineer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "The collaborative features make remote development feel seamless.",
  },
  {
    name: "Emma Wilson",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content:
      "Met incredible developers and launched our startup through CodeMate.",
  },
  {
    name: "James Lee",
    role: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "Best platform for finding like-minded developers to build with.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="content-container">
        <h2 className="text-2xl font-medium text-center mb-16">
          Trusted by developers worldwide
        </h2>

        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base-100 to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-100 to-transparent z-10" />

          <div className="mask-fade-r overflow-hidden">
            <div className="flex animate-scroll">
              {[...testimonials, ...testimonials, ...testimonials].map(
                (testimonial, i) => (
                  <div key={i} className="flex-none w-[320px] h-[320px] p-4">
                    <div className="h-full bg-base-200/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="ml-4">
                          <a
                            href="#"
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {testimonial.name}
                          </a>
                          <div className="text-sm text-base-content/60">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                      <p className="text-base text-base-content/80 line-clamp-6">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
