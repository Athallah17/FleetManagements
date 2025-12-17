"use client";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useDashboard } from "@/hooks/useDashboard";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export function MostUsed() {
  const { data } = useDashboard();
  if (!data) return <p>Loading...</p>;

  // Map backend mostUsedCars to chart data
  const chartData = data.mostUsedCars
    .filter(car => car.model)
    .map(car => ({
      Type: car.model,
      Usage: car._count.model
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="Usage"
          nameKey="Type"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
