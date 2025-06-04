"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const router = useRouter();

  // Obsługa stanu logowania
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sprawdzenie czy user jest adminem
  useEffect(() => {
    // W useEffect do sprawdzania admina
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setAdminLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/isAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIsAdmin(data.isAdmin === true);
      } catch (err) {
        console.error("Błąd podczas sprawdzania admina:", err);
        setIsAdmin(false);
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdmin();
  }, [user]);

  const logout = async () => {
    await signOut(auth);
    await fetch("/api/signout", { method: "POST" });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, adminLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth musi być używany wewnątrz <AuthProvider>");
  }
  return context;
}
