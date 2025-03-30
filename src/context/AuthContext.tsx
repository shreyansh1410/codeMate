import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  age: number;
  gender: string;
  skills: string[];
  bio: string;
  photoURL: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ emailId: email, password }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      setUser(data.user);
      setToken(data.token);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      setUser(null);
      setToken(null);
    } catch (error: any) {
      throw new Error(error.message || "Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
