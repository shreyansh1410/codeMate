import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
        Privacy Policy
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

        <h2 className="mt-8 text-2xl font-medium">1. Introduction</h2>
        <p>
          CodeMate ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our platform.
        </p>

        <h2 className="mt-8 text-2xl font-medium">2. Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul>
          <li>Create an account or profile</li>
          <li>Connect with other developers</li>
          <li>Participate in projects or teams</li>
          <li>Make payments through our platform</li>
          <li>Contact our support team</li>
        </ul>

        <h2 className="mt-8 text-2xl font-medium">3. Payment Information</h2>
        <p>
          When you make payments through our platform, your payment information
          is processed securely by our payment processor, Razorpay. We do not
          store your complete credit card details on our servers. For more
          information about Razorpay's privacy practices, please refer to
          Razorpay's Privacy Policy.
        </p>

        <h2 className="mt-8 text-2xl font-medium">
          4. How We Use Your Information
        </h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Connect you with other developers and teams</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Monitor and analyze trends and usage of our platform</li>
        </ul>

        <h2 className="mt-8 text-2xl font-medium">5. Information Sharing</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Other users in accordance with your privacy settings</li>
          <li>Service providers who perform services on our behalf</li>
          <li>Business partners with your consent</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2 className="mt-8 text-2xl font-medium">6. Your Choices</h2>
        <p>
          You can access and update certain information about you through your
          account settings. You may also set your browser to block cookies,
          although this might affect your ability to use some features of our
          platform.
        </p>

        <h2 className="mt-8 text-2xl font-medium">7. Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet or
          electronic storage is 100% secure, so we cannot guarantee absolute
          security.
        </p>

        <h2 className="mt-8 text-2xl font-medium">
          8. Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          material changes, we will notify you by email or through our platform
          prior to the changes becoming effective.
        </p>

        <h2 className="mt-8 text-2xl font-medium">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> shreyanshshukla@codemate.diy
          <br />
        </p>
      </div>
    </div>
  );
};

export default Privacy;
