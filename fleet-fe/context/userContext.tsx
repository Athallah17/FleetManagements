'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import {jwtDecode} from "jwt-decode";
import { authService } from "@/services/auth-services";

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'supervisor' | 'driver';
  office: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

interface JWTPayload {
  id: string;
  name?: string;
  role: string;
  office?: string;
  exp: number;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize user from token on mount
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      const payload = jwtDecode<JWTPayload>(token);
      setUser({
        id: payload.id,
        name: payload.name || "",
        role: payload.role as User['role'],
        office: payload.office || "",
        token,
      });

      // Auto-refresh token 1 minute before expiry
      const now = Date.now() / 1000;
      const delay = (payload.exp - now - 60) * 1000; // milliseconds
      if (delay > 0) {
        const timer = setTimeout(async () => {
          const newToken = await authService.refreshToken();
          if (newToken) {
            const newPayload = jwtDecode<JWTPayload>(newToken);
            setUser((prev) => prev ? { ...prev, token: newToken } : null);
          } else {
            setUser(null);
          }
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
