"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-services";
import { useUser } from "@/context/userContext"; //

type AuthForm = {
  email: string;
  password: string;
};

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser(); // get setUser from context

  const handleAuth = async (form: AuthForm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(form.email, form.password);

      // Update context with logged-in user
      setUser({
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
        office: data.user.office,
        email: data.user.email,
        token: data.token,
        createdAt: data.createdAt,
      });

      router.push("/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleAuth };
}
