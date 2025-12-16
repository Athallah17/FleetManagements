"use client";

import { useState } from "react";
import { authService } from "@/services/auth-services";
import { useRouter } from "next/navigation";

type AuthForm = {
  email: string;
  password: string;
};

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (form: AuthForm) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(form.email, form.password);
      router.push("/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleAuth };
}