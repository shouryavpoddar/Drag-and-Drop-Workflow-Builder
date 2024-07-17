import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {

      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      setUserName(user.displayName);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserName(null);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    userName,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}