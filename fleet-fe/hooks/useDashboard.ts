// hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { dashboardService, DashboardData } from "@/services/dashboard-services";

export const useDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard-data"],
    queryFn: () => dashboardService.getDashboardData(),
    staleTime: 1000 * 60 * 2, // 2 minutes caching
  });
};
