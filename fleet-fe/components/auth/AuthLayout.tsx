"use client"
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const { loading, error, handleAuth} = useAuth();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth(form);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && emailValid && form.password && !loading) {
      handleSubmit();
    }
  };

  const emailValid = validateEmail(form.email);
  const showEmailError = touched.email && form.email && !emailValid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
  
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h1>
          <p className="text-slate-600">Sign in to continue to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8">
          <div className="space-y-5" onKeyPress={handleKeyPress}>
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border-2 rounded-xl focus:outline-none transition-all text-slate-800 placeholder:text-slate-400 ${
                    showEmailError
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : emailValid && form.email
                      ? "border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }`}
                  placeholder="you@example.com"
                />
                {form.email && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailValid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : touched.email ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
              {showEmailError && (
                <p className="text-xs text-red-600 mt-1 ml-1">Please enter a valid email address</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset functionality")}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold transition-colors hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !emailValid || !form.password}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          {/* Sign Up Link
          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{" "}
            <button 
              onClick={() => alert("Sign up functionality")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
            >
              Sign up for free
            </button>
          </p> */}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}