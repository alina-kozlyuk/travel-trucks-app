"use client";

import { useEffect, useState } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi"; 
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const [isChecking, setIsChecking] = useState(true); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const isSessionValid = await checkSession();

        if (!isSessionValid) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        if (!user) {
          clearIsAuthenticated();
          return;
        }

        setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsChecking(false); 
      }
    };

    verifyUser();
  }, [setUser, clearIsAuthenticated]);

  if (isChecking) {
    return null; 
  }

  return <>{children}</>;
}