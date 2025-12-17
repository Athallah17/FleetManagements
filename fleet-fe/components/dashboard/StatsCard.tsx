import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  description?: string;
  gradient: string;
  iconBg: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  className,
  description,
  gradient,
  iconBg,

}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "p-4 relative flex flex-col justify-center items-center shadow-sm hover:shadow-xl border-blue-950/80",
        gradient,
        className
      )}
    >
      <div className="absolute top-4 right-4 p-3 rounded-xl  flex items-center justify-center ">
        <div className={cn(iconBg, "p-3 rounded-xl")}>{icon}</div>
      </div>

      <p className="text-sm font-medium w-full text-center">{title}</p>
      <h2 className="text-2xl font-bold  w-full text-center mt-1">{value}</h2>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 w-full text-center">
          {description}
        </p>
      )}
    </Card>
  );
}
