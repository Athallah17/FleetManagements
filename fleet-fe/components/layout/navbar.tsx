"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Mail, Shield, Calendar, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useUser} from "@/context/userContext"

export function Navbar() {

    const pathname = usePathname();
    const {user} = useUser();
    // const title =
    //     pathname === "/"
    //     ? "Dashboard"
    //     : pathname
    //         .split("/")
    //         .filter(Boolean)
    //         .pop()
    //         ?.replace(/-/g, " ")
    //         .replace(/\b\w/g, (c) => c.toUpperCase());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
return (
    <>
    <header className="w-full bg-gradient-to-r  from-blue-200 to-gray-300  px-8 py-4  border-b-blue-950 border-b-4">
        <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
                
            </h1>
            
            <div className="flex items-center gap-4">
                <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-white to-white hover:from-indigo-100 hover:to-purple-100 px-4 py-2 rounded-xl border border-indigo-100 transition-all hover:shadow-md group"
                >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform">
                    {user?.name?.charAt(0) || "G"}
                </div>
                <div className="text-left">
                    <div className="text-sm font-semibold text-slate-800">
                    {user?.name || "Guest"}
                    </div>
                    <div className="text-xs text-slate-500">
                    {user?.role || "User"}
                    </div>
                </div>
                </button>
            </div>
            </div>
        </header>

        {/* User Info Dialog */}
        {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsDialogOpen(false)}
            ></div>

            {/* Dialog */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-br from-blue-200 to-blue-600 px-6 py-8">
                <button
                    onClick={() => setIsDialogOpen(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-xl mb-4">
                    {user?.name?.charAt(0) || "G"}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                    {user?.name || "Guest User"}
                    </h2>
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Shield className="w-3.5 h-3.5 text-white" />
                    <span className="text-sm text-white font-medium">
                        {user?.role || "User"}
                    </span>
                    </div>
                </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                    <div className="text-xs text-slate-500 font-medium">Email</div>
                    <div className="text-sm text-slate-800 font-medium">
                        {user?.email || "No email"}
                    </div>
                    </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                    <div className="text-xs text-slate-500 font-medium">Role</div>
                    <div className="text-sm text-slate-800 font-medium">
                        {user?.role || "User"}
                    </div>
                    </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                    <div className="text-xs text-slate-500 font-medium">Member Since</div>
                    <div className="text-sm text-slate-800 font-medium">
                        {user?.createdAt || "Unknown"}
                    </div>
                    </div>
                </div>

                {/* Last Login */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                    <div className="text-xs text-slate-500 font-medium">Last Login</div>
                    <div className="text-sm text-slate-800 font-medium">
                        {user?.lastLogin || "Just now"}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}