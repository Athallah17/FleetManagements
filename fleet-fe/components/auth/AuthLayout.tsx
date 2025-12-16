'use client';

import { ArrowLeft, Wallet, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  type: 'login' | 'register';
  title: string;
  subtitle: string;
}

const floatingIcons = [
  { Icon: Wallet, color: 'text-teal-400', delay: 0 },
  { Icon: TrendingUp, color: 'text-emerald-400', delay: 0.2 },
  { Icon: Users, color: 'text-rose-400', delay: 0.4 },
];

export default function AuthLayout({ children, type, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6 relative overflow-hidden">
      {/* Back to Home */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Main Card */}
        <div>
          {/* Title */}
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-slate-600">{subtitle}</p>
          {/* Form */}
            {children}
          {/* Footer Links */}
                {type === 'login' ? (
                <p className="text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                    Sign up for free
                    </Link>
                </p>
                ) : (
                <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                    Login
                    </Link>
                </p>
                )}
        </div>
    </div>
  );
}
