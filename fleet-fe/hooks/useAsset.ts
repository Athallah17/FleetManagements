import { useState, useCallback } from "react";
import { AssetService } from "@/services/asset-services";

export function useAssets(initialLimit = 10) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehicleDetail, setVehicleDetail] = useState<any | null>(null);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  // Fetch all vehicles
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AssetService.getVehicle(page, limit);
      console.log("Vehicle response:", res); // add this to debug
      setVehicles(res || []); // adapt to your backend
      setTotal(res.length || 0);
    } catch (err) {
      setError("Failed to fetch vehicles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  // Fetch vehicle detail by ID
  const fetchVehicleDetail = async (id: string) => {
    setLoading(true);
    try {
      const data = await AssetService.DetailVehicle(id);
      setVehicleDetail(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch vehicle detail");
    } finally {
      setLoading(false);
    }
  };

  // Add vehicle
  const addVehicle = async (payload: any) => {
    setLoading(true);
    try {
      const data = await AssetService.AddVehicle(payload);
      setVehicles((prev) => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err?.message || "Failed to add vehicle");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get vehicle statistics
  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await AssetService.StatsVehicle();
      setStats(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch vehicle stats");
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    vehicleDetail,
    stats,
    loading,
    error,
    page,
    limit,
    total,
    setPage,
    fetchVehicles,
    fetchVehicleDetail,
    addVehicle,
    fetchStats,
  };
}
