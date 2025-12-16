import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    WAITING_ADMIN: "bg-yellow-100 text-yellow-700",
    ACCEPTED_ADMIN: "bg-green-100 text-green-700",
    REJECTED_ADMIN: "bg-red-100 text-red-700",
    WAITING_SPV: "bg-yellow-200 text-yellow-800",
    ACCEPTED_SPV: "bg-green-200 text-green-800",
    REJECTED_SPV: "bg-red-200 text-red-800",
  }

return (
    <span
        className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        map[status] ?? "bg-muted text-muted-foreground"
        )}
    >
        {status}
    </span>
  )
}
