"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error, handleAuth } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
            Password
          </label>
          <a href="#" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Submit"}
      </Button>
    </form>
  );
}
