import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "./Firebase";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setLoading(true);
    if (currentUser) {
      try {
        // First, generate JWT for this user
        const tokenRes = await axios.post(
          "https://fitness-server-lilac.vercel.app/jwt",
          { email: currentUser.email }
        );
        const token = tokenRes.data.token;
        localStorage.setItem("access-token", token);

        // Then, get user info (role) from backend
        const res = await axios.get(
          `https://fitness-server-lilac.vercel.app/user/${currentUser.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const userData = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: res.data.role || "user",
        };
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: "user",
        });
      }
    } else {
      setUser(null);
      localStorage.removeItem("access-token");
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
