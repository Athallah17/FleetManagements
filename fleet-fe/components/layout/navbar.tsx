"use client";

import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export function Navbar() {

    const pathname = usePathname();

    const title =
        pathname === "/"
        ? "Dashboard"
        : pathname
            .split("/")
            .filter(Boolean)
            .pop()
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <header className="w-full border-b bg-white px-8 py-4 dark:bg-black dark:border-zinc-800">
            <div className="flex h-16 items-center justify-between">
                {/* Dynamic based on what pages are we now */}
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                        <FiUser className="text-xl text-slate-600" />
                        {/* admin placeholder */}
                        <span className="text-sm text-slate-700">Admin</span>
                    </div>
                    <Button variant="outline" size="sm">
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )
}