import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "codemate-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="btn btn-ghost btn-circle mr-2"
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
