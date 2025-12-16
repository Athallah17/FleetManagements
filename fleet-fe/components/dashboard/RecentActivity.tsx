import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const activities = [
    {
        id: 1,
        user: {
            name: "John Doe",
            image: "/images/avatars/01.png",
        },
        action: "Rented a vehicle",
        timestamp: "2 hours ago",
        fallback: "JD"
    },
    {
        id: 2,
        user: {
            name: "Jane Smith",
            image: "/images/avatars/02.png",
        },
        action: "Request Approval",
        timestamp: "1 day ago",
        fallback: "JS"
    },
    {
        id: 3,
        user: {
            name: "Michael Johnson",
            image: "/images/avatars/03.png",
        },
        action: "Completed Rental",
        timestamp: "3 days ago",
        fallback: "MJ"
    },
];

export function RecentActivity(){
    return (
        <div className="space-y-6">
            {activities.map(activity => (
                <div key={activity.id} className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.image} alt={activity.user.name} />
                        <AvatarFallback>{activity.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-wrap items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                            <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}