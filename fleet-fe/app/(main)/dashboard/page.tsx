import { FiCheckCircle, FiClock, FiTruck, FiXCircle } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Overview} from "@/components/dashboard/Overview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { MostUsed } from "@/components/dashboard/MostUsed";
import { AnalyticsTabs } from "@/components/dashboard/AnalyticsGraph";
import { MaintenanceDue } from "@/components/dashboard/Maintance";
import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
    return (
        <div className=" bg-gray-50 dark:bg-zinc-900 ">
            <main className="p-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                    </h1>
                    {/* CTA Button */}
                </div>

                {/* Top Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Total Vehicles"
                        value={75}
                        icon={<FiTruck className="h-5 w-5" />}
                        description="All vehicles in fleet"
                    />
                    <StatsCard
                        title="Available Vehicles"
                        value={50}
                        icon={<FiTruck className="h-5 w-5" />}
                        description="In the fleet"
                    />
                    <StatsCard
                        title="Active Vehicles"
                        value={10}
                        icon={<FiTruck className="h-5 w-5" />}
                        description="Currently in use"
                    />
                    <StatsCard
                        title="Returned Vehicles"
                        value={5}
                        icon={<FiTruck className="h-5 w-5" />}
                        description="Back in fleet"
                    />

                    {/* Approval Cards */}
                    <StatsCard
                        title="Total Bookings"
                        value={128}
                        icon={<FiTruck className="h-5 w-5" />}
                        description="This month"
                    />
                    <StatsCard
                        title="Pending Approval"
                        value={14}
                        icon={<FiClock className="h-5 w-5" />}
                        description="Awaiting review"
                    />
                    <StatsCard
                        title="Approved"
                        value={96}
                        icon={<FiCheckCircle className="h-5 w-5" />}
                        description="Successfully approved"
                    />
                    <StatsCard
                        title="Rejected"
                        value={18}
                        icon={<FiXCircle className="h-5 w-5" />}
                        description="Bookings denied"
                    />
                </div>

                {/* Overview */}
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                    <Card className="col-span-1 lg:col-span-2 ">
                        <CardHeader>
                            <CardTitle className="px-4 pt-4">Vehicle Usage</CardTitle>
                            <CardDescription className="px-4 pb-2">
                                Monthly vehicle usage overview
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Overview />
                        </CardContent>
                    </Card>

                    {/* Most Used Vehicles */}
                    <Card className="col-span-1 lg:col-span-1 ">
                        <CardHeader>
                            <CardTitle> Most Used Cars </CardTitle>
                            <CardDescription>
                                Top 5 vehicles Types rented
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MostUsed />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-2 gap-4 ">
                    {/* Analytics Graph*/}
                    <Card className="col-span-1 lg:col-span-1">
                        <CardHeader>
                            <CardTitle> Analytics </CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <AnalyticsTabs/>
                        </CardContent>
                    </Card>
                    <div className="grid grid-rows-1 gap-2 ">
                        {/* Recent Activity */}
                        <Card className='col-span-1 lg:col-span-1'>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest vehicle rental activities
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentActivity />
                            </CardContent>
                        </Card>
                        <Card className='col-span-1 lg:col-span-1'>
                            <CardHeader>
                                <CardTitle>Maintaince</CardTitle>
                                <CardDescription>
                                    Vehicle That Need To Be Service By Its Time or Travel Distance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <MaintenanceDue/>
                            </CardContent>
                        </Card>
                    </div>
                </div>



            </main>
        </div>
    );
}
