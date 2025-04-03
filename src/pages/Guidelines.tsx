import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Guidelines = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      <h1 className="text-4xl font-['Instrument_Serif'] mb-8">
        Community Guidelines
      </h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-base-content/80">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p className="lead text-lg">
          At CodeMate, we're building a collaborative community where developers
          can connect, learn, and create together. These guidelines help ensure
          our platform remains a positive, productive, and inclusive space for
          everyone.
        </p>

        <h2 className="mt-8 text-2xl font-medium">1. Respect Each Other</h2>
        <p>
          Treat everyone with respect. Do not engage in harassment,
          discrimination, or hate speech based on race, ethnicity, gender,
          religion, sexual orientation, disability, or any other personal
          characteristic.
        </p>

        <h2 className="mt-8 text-2xl font-medium">2. Professional Conduct</h2>
        <p>
          Maintain professional conduct in all interactions. Be constructive in
          your feedback, avoid personal attacks, and focus on ideas rather than
          individuals.
        </p>

        <h2 className="mt-8 text-2xl font-medium">3. Honest Representation</h2>
        <p>
          Be honest about your skills, experience, and intentions.
          Misrepresentation undermines trust in our community and can lead to
          account suspension.
        </p>

        <h2 className="mt-8 text-2xl font-medium">4. Quality Content</h2>
        <p>
          Share content that adds value to the community. Avoid spam, duplicate
          posts, or content that's not relevant to software development and team
          collaboration.
        </p>

        <h2 className="mt-8 text-2xl font-medium">5. Intellectual Property</h2>
        <p>
          Respect intellectual property rights. Don't share code, designs, or
          other content without proper attribution or permission if required.
          When collaborating on projects, ensure you have clear agreements about
          ownership and licensing.
        </p>

        <h2 className="mt-8 text-2xl font-medium">6. Security and Privacy</h2>
        <p>
          Do not share security vulnerabilities publicly. Report them through
          appropriate channels. Respect others' privacy and do not share
          personal information without consent.
        </p>

        <h2 className="mt-8 text-2xl font-medium">7. Payment Disputes</h2>
        <p>
          If you encounter any issues with payments or transactions on our
          platform, please contact our support team directly rather than
          discussing payment disputes publicly.
        </p>

        <h2 className="mt-8 text-2xl font-medium">8. Reporting Violations</h2>
        <p>
          If you see content or behavior that violates these guidelines, please
          report it to our moderation team through the "Report" feature or by
          contacting support@codemate.com.
        </p>

        <h2 className="mt-8 text-2xl font-medium">
          9. Consequences of Violations
        </h2>
        <p>
          Violations of these guidelines may result in content removal,
          temporary restrictions, or permanent account suspension, depending on
          the severity and frequency of violations.
        </p>

        <h2 className="mt-8 text-2xl font-medium">10. Feedback</h2>
        <p>
          We value your feedback on these guidelines. If you have suggestions
          for improvements, please contact us at community@codemate.com.
        </p>

        <div className="mt-12 p-6 bg-base-200 rounded-lg border border-white/5">
          <h3 className="text-xl font-medium mb-4">Contact Information</h3>
          <p>
            For questions about these Community Guidelines or to report
            violations, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> shryeansh.14010@gmail.com
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
