"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip } from 'recharts';
import { useDashboard } from "@/hooks/useDashboard";

export function Overview() {
  const { data } = useDashboard();

  if (!data) return <p>Loading...</p>;

  const chartData = [
    { month: "This Month", total: data.monthlyVehicleUsage }, // you can extend to full months later
  ];

  const getColor = (value: number) => {
    if (value < 20) return "#f56565"; // red
    if (value > 20) return "#10b981"; // green
    return "#ecc94b"; // yellow
  };

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.total)} />
            ))}
          </Bar>
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
