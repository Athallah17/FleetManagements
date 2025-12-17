import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export type ApprovalAction = "APPROVE" | "REJECT";

export interface Approval {
    id: string;
    action: ApprovalAction;
}

export interface BookingApprovalResponse {
    id: string;
    status: string;
    adminId?: string;
    adminApprovedAt?: string;
    spvApprovedAt?: string;
    [key: string]: any;
}

export const ApprovalService = {
  // Admin approval
    adminApproval: async (payload: Approval): Promise<BookingApprovalResponse> => {
        const res = await axiosInstance.patch<BookingApprovalResponse>(
        API.APPROVAL.ADMIN(payload.id),
        { action: payload.action }
        );
        return res.data;
    },

    // Supervisor approval
    spvApproval: async (payload: Approval): Promise<BookingApprovalResponse> => {
        const res = await axiosInstance.patch<BookingApprovalResponse>(
        API.APPROVAL.SPV(payload.id),
        { action: payload.action }
        );
        return res.data;
    },
    getPendingApprovals: async (): Promise<BookingApprovalResponse[]> => {
    const res = await axiosInstance.get<BookingApprovalResponse[]>(
        API.APPROVAL.PENDING
    );
    return res.data;
  },
};
