import { ResponsiveContainer } from "recharts";
export function ChartWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}