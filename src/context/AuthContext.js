import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide context value
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Check for token on app initialization
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Sign out function
  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
