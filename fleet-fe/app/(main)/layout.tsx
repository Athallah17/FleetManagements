"use client"
import { Sidebar } from "@/components/layout/sidebar"
import { Navbar } from "@/components/layout/navbar"
import { SidebarProvider } from "@/components/layout/sidebar-context"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "@/context/userContext"

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex flex-1 flex-col">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </QueryClientProvider>
    </UserProvider>
  )
}
