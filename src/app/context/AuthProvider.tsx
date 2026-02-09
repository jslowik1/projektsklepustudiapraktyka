"use client";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserAddress } from "../model/User";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminLoading: boolean;
  logout: () => Promise<void>;
  userData: UserData | undefined
}


export interface UserData {
  displayName: string;
  phoneNumber: string;
  address: UserAddress;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      if (user) {
        console.log(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userData = {
            phoneNumber: data.phoneNumber,
            address: data.address,
            displayName: data.displayName
          }
          setUserData(userData);
        }
      }
    }
    void getItems()
  }, [user])

  useEffect(() => {
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
      value={{ user, loading, isAdmin, adminLoading, logout, userData }}
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
