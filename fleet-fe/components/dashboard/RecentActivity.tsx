"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDashboard } from "@/hooks/useDashboard";
import { formatDistanceToNow } from "date-fns";

export function RecentActivity() {
  const { data } = useDashboard();
  if (!data) return <p>Loading...</p>;

  const activities = data.recentActivities;

  return (
    <div className="space-y-6 ">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {activity.driver?.name?.split(" ").map(n => n[0]).join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{activity.driver?.name}</p>
              <p className="text-sm text-muted-foreground">
                {activity.status.replace(/_/g, " ").toLowerCase()}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
