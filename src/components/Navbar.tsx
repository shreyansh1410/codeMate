import logo from "/codemate_logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-base-100/50 border-b border-white/5">
      <div className="content-container h-full flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <img src={logo} alt="CodeMate" className="h-6 w-6" />
          <span className="font-medium">CodeMate</span>
        </a>

        <div className="flex items-center gap-4">
          <a href="/login" className="hover:text-primary transition-colors">
            Sign in
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign up free
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
