"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { FiHome, FiTruck, FiSettings, FiChevronLeft, FiCheckSquare  } from "react-icons/fi"
import { PiCarProfile,PiFile  } from "react-icons/pi";
import { useSidebar } from "./sidebar-context"

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: FiHome },
  { label: "Approval", href: "/approvals", icon: FiCheckSquare},
  { label: "Bookings", href: "/bookings", icon: FiTruck },
  { label: "Asset", href: "/asset", icon: PiCarProfile},
  { label: "Reports", href: "/reports", icon: PiFile  },
  { label: "Settings", href: "/settings", icon: FiSettings },
]

export function Sidebar() {
  const { collapsed, toggle } = useSidebar()

  return (
    <aside
      className={cn(
        "relative h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-6 z-10 rounded-full border bg-background p-1"
      >
        <FiChevronLeft
          className={cn(
            "h-8 w-8 transition-transform",
            collapsed && "rotate-180"
          )}
        />
      </button>

      <div className="p-4 mt-32">
        {!collapsed && (
          <h2 className="mb-6 text-lg font-semibold">
          </h2>
        )}

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 transition-colors hover:bg-muted",
                collapsed ? "justify-center" : "gap-3"
              )}
            >
              <item.icon
                  className={cn(
                    "shrink-0 transition-all",
                    collapsed ? "h-6 w-6" : "h-5 w-5"
                  )}
                />
                {!collapsed && (
                  <span className="whitespace-nowrap text-sm transition-opacity duration-200">
                    {item.label}
                  </span>
                  )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
