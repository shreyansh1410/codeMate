import type { User } from "../store/authSlice";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginData {
  emailId: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
  age?: number;
  gender?: string;
  skills?: string[];
  bio?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
};

export const checkAuthStatus = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/verify`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }
  return result;
};

export const getProfile = async () => {
  const response = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};
