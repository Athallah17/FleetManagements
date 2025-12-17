export const API = {
    AUTH : {
        LOGIN : "/auth/login",
        HEALTH: "/health",
    },
    DASHBOARD : {
        STATS : "/dashboard/stats",
        VEHICLE: "/dashboard/vehicle",
        ACTIVITY: "/dashboard/activity",
    },
    BOOKINGS : {
        CREATE : "/bookings",
        GET : "/bookings",
        DETAILED : (id: string) => `/bookings/${id}`,
        UPDATE : (id: string) => `/bookings/${id}`,
        DELETE : (id: string) => `/bookings/${id}`,
    },
    APPROVAL : {
        PENDING : "/bookings/approval/pending",
        ADMIN : (id: string) => `/bookings/${id}/admin-approval`,
        SPV : (id: string) => `/bookings/${id}/spv-approval`,
    },
    ASSETS : {
        GET : "/vehicles",
        DETAILED : (id: string) => `/vehicles/${id}`,
        CREATE : "/vehicles",
        UPDATE : (id: string) => `/vehicles/${id}`,
        DELETE : (id: string) => `/vehicles/${id}`,
        STATS : "/stats/data",
    }
}