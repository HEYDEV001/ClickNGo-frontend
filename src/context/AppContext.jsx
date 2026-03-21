import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";
import { useLocation } from "../hooks/useLocation";

const STORAGE_KEY = "clickngo_user";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { msg: toastMsg, show } = useToast();
  const [user, setUserState] = useState(null);
  const [location, setLocation] = useState("Street 133, Times Square, NYC");

  useLocation(setLocation);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && parsed.name) {
          setUserState(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load user from localStorage", e);
    }
  }, []);

  // Persist user to localStorage on change
  const setUser = (u) => {
    setUserState(u);
    if (u) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch (e) {
        console.warn("Failed to save user to localStorage", e);
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  const value = {
    user,
    setUser,
    location,
    setLocation,
    showToast: show,
    toastMsg,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
