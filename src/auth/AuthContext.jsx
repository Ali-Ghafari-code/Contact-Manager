/* eslint-disable react/prop-types */
/* AuthContext.js */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, email) => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }

      const users = await response.json();
      const user = users.find(
        (u) => u.username === username && u.email === email
      );

      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const signUp = async (formData) => {
    try {
      const newUser = { ...formData, id: new Date().getTime() };

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up!");
      }

      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
