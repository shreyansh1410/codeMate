import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <h1 className="text-4xl font-['Instrument_Serif'] mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-base-content/80">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2 className="mt-8 text-2xl font-medium">1. Agreement to Terms</h2>
        <p>
          By accessing or using CodeMate, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">2. Use License</h2>
        <p>
          Permission is granted to temporarily access the materials on CodeMate's website for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">3. User Accounts</h2>
        <p>
          To use certain features of our platform, you must register for an account. You agree to provide accurate information and to keep it updated. You are responsible for maintaining the confidentiality of your account and password.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">4. Payment Terms</h2>
        <p>
          We use Razorpay to process payments. By making a payment through our platform, you agree to Razorpay's terms of service. All payment transactions are secured and encrypted.
        </p>
        <p>
          You agree to pay all fees and charges associated with your account on a timely basis. All payments are non-refundable except as expressly set forth in our Refund Policy or as required by applicable law.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">5. User Content</h2>
        <p>
          Our platform allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post and its legality.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">6. Prohibited Activities</h2>
        <p>
          You may not use our platform for any illegal purpose or to violate any laws. You may not upload viruses or malicious code or interfere with the proper working of our services.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">7. Intellectual Property</h2>
        <p>
          The content, features, and functionality of our platform are owned by CodeMate and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">8. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to our platform immediately, without prior notice, if you violate these Terms of Service.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">9. Limitation of Liability</h2>
        <p>
          CodeMate shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use our platform.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting a prominent announcement on our platform.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">11. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
        </p>
        
        <h2 className="mt-8 text-2xl font-medium">12. Contact Information</h2>
        <p>
          For any questions regarding these Terms of Service, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> legal@codemate.com<br />
          <strong>Address:</strong> CodeMate Headquarters, 123 Dev Avenue, Tech City, 10001
        </p>
      </div>
    </div>
  );
};

export default Terms;