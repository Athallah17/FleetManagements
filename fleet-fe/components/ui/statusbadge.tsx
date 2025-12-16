import { cn } from "@/lib/utils"

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Accepted: "bg-green-100 text-green-700",
    Waiting: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
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
