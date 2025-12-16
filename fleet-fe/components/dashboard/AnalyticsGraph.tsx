"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ChartWrapper } from "./ChartWrapper";

const fuelData = [
    { month: "Jan", fuel: 1200 },
    { month: "Feb", fuel: 980 },
    { month: "Mar", fuel: 1450 },
    { month: "Apr", fuel: 1100 },
    { month: "May", fuel: 1040 },
    { month: "June", fuel: 1980 },
    { month: "July", fuel: 1550 },
    { month: "Aug", fuel: 1240 },
];

const vehicleUsageData = [
  { type: "Pickup", total: 48 },
  { type: "SUV", total: 32 },
  { type: "Bus", total: 20 },
  { type: "Sedan", total: 15},
];

const siteStackedData = [
    { site: "Site A", pickup: 20, suv: 10, bus: 5 },
    { site: "Site B", pickup: 15, suv: 8, bus: 3 },
    { site: "Site C", pickup: 10, suv: 6, bus: 4 },
    { site: "Site D", pickup: 20, suv: 10, bus: 5 },
    { site: "Site E", pickup: 15, suv: 6, bus: 2 },
    { site: "Site F", pickup: 5, suv: 2, bus: 6 },
];

const avgRentTimeData = [
  { month: "Jan", hours: 6.2 },
  { month: "Feb", hours: 5.8 },
  { month: "Mar", hours: 6.5 },
  { month: "Apr", hours: 6.1 },
];

export const CHART_COLORS = {
  primary: "#2563eb",   // blue-600
  success: "#16a34a",   // green-600
  warning: "#f59e0b",   // amber-500
  danger: "#dc2626",    // red-600
  neutral: "#64748b",   // slate-500

  pickup: "#2563eb",
  suv: "#16a34a",
  bus: "#f59e0b",
};

export function AnalyticsTabs() {
    return (
        <div className="">
        <Tabs defaultValue="fuel">
            <TabsList className="mb-4">
            <TabsTrigger value="fuel">Fuel Consumption</TabsTrigger>
            <TabsTrigger value="site">Most Requested Site</TabsTrigger>
            <TabsTrigger value="rent">Avg Rent Time</TabsTrigger>
            </TabsList>

            {/* Fuel Consumption - Line */}
            <TabsContent value="fuel">
            <ChartWrapper>
                <LineChart data={fuelData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="fuel"
                    strokeWidth={2}
                    stroke={CHART_COLORS.warning}
                />
                </LineChart>
            </ChartWrapper>
            </TabsContent>

            {/* Mining Site - Stacked Bar */}
            <TabsContent value="site">
            <ChartWrapper>
                <BarChart data={siteStackedData}>
                <XAxis dataKey="site" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pickup" stackId="a" fill={CHART_COLORS.pickup} />
                <Bar dataKey="suv" stackId="a" fill={CHART_COLORS.suv} />
                <Bar dataKey="bus" stackId="a" fill={CHART_COLORS.bus}/>
                </BarChart>
            </ChartWrapper>
            </TabsContent>

            {/* Average Rent Time - Line */}
            <TabsContent value="rent">
            <ChartWrapper>
                <LineChart data={avgRentTimeData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="hours"
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                />
                </LineChart>
            </ChartWrapper>
            </TabsContent>
        </Tabs>
        </div>
    );
}