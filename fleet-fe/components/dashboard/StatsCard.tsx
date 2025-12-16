import {Card} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    className?: string;
    description?: string;
}

export default function StatsCard({ title, value, icon, className, description }: StatsCardProps) {
    return (
        <Card className={cn("p-4 relative flex flex-col justify-center items-center", className)}>
            <div className="absolute top-4 right-4 p-3 rounded-xl bg-muted flex items-center justify-center">
            {/* icon not styled label yet */}
            {icon}
            </div>
            <p className="text-sm text-gray-500 w-full text-center">{title}</p>
            <h2 className="text-2xl font-bold text-gray-800 w-full text-center mt-1">{value}</h2>
            {description && (
            <p className="text-xs text-muted-foreground mt-1 w-full text-center">
                {description}
            </p>
            )}
        </Card>
    );
}