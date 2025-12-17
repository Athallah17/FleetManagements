"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { StatusBadge } from "../ui/statusbadge";
import type { BookingApprovalResponse } from "@/services/approval-services";
import { useApproval } from "@/hooks/useApproval";

interface ApprovalCardProps {
  booking: BookingApprovalResponse;
  role: "ADMIN" | "SUPERVISOR"; // role user untuk approval
}

export function ApprovalCard({ booking, role }: ApprovalCardProps) {
    if (!booking) return null;
    const [status, setStatus] = React.useState(booking.status);
    const { mutate, isLoading } = useApproval({ role });

  // menentukan apakah tombol bisa diaktifkan sesuai role dan status
  const canApprove =
    (role === "ADMIN" && status === "WAITING_ADMIN") ||
    (role === "SUPERVISOR" && status === "APPROVED_ADMIN");

  const handleAction = (action: "APPROVE" | "REJECT") => {
    if (!canApprove) return;
    mutate(
      { id: booking.id, action },
      {
        onSuccess: (data) => setStatus(data.status),
      }
    );
  };

    const StatusMes: Record<string, string> = {
    WAITING_ADMIN: "Please wait for Admin approval",
    APPROVED_ADMIN: "Waiting for Supervisor approval",
    REJECTED_ADMIN: "Rejected by Admin",
    APPROVED_SPV: "Approved by Supervisor",
    REJECTED_SPV: "Rejected by Supervisor",
    };

  return (
    <div className="bg-white dark:bg-zinc-800 flex flex-col gap-3 p-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-extrabold">{booking.model}</h3>
          <p className="text-sm font-bold text-muted-foreground">{booking.plateNumber}</p>
          <p className="text-sm text-muted-foreground"> {StatusMes[status] || status}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Driver & Supervisor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(booking.driver?.name)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p>{booking.driver?.name}</p>
            <p className="text-xs text-muted-foreground">{booking.driver?.contact || booking.driver?.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(booking.supervisor?.name)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p>{booking.supervisor?.name}</p>
            <p className="text-xs text-muted-foreground">{booking.supervisor?.contact || booking.supervisor?.phone}</p>
          </div>
        </div>
      </div>

      {/* Office */}
      <p className="text-sm text-muted-foreground">Office: {booking.office || "N/A"}</p>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => handleAction("APPROVE")} disabled={!canApprove || isLoading}>
          Approve
        </Button>
        <Button size="sm" variant="destructive" onClick={() => handleAction("REJECT")} disabled={!canApprove || isLoading}>
          Reject
        </Button>
      </div>
    </div>
  );
}
