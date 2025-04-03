import { Code2, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bottom-0 w-full">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodeMate</span>
            </div>
            <p className="text-sm text-base-content/60 max-w-md">
              Building the future of collaborative development. Join our
              community of developers and create something amazing together.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors"
                >
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-base-content/60">
            © {new Date().getFullYear()} CodeMate. All rights reserved.
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/shreyansh1410"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Github className="h-5 w-5 text-base-content/60 hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyansh1410/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-base-content/60 hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
