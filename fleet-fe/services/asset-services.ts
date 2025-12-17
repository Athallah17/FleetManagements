import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const AssetService = {
    getVehicle: async (page = 1, limit = 10) => {
        const res = await axiosInstance.get(API.ASSETS.GET, {
        params: { page, limit }
        });
        return res.data; // Expect { vehicles, total }
    },
    DetailVehicle: async(id:string) => {
        const res = await axiosInstance.get(API.ASSETS.DETAILED(id));
        return res.data
    },
    AddVehicle: async () => {
        const res = await axiosInstance.post(API.ASSETS.CREATE)
        return res.data
    },
    StatsVehicle: async () => {
        const res = await axiosInstance.get(API.ASSETS.STATS)
        return res.data
    },
}