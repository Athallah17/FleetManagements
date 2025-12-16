"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { StatusBadge } from "../ui/statusbadge";
import type { ApprovalData, ApprovalStatus } from "./data/mockdata"

export function ApprovalCard({ booking }: { booking: ApprovalData }) {
    const [status, setStatus] = useState<ApprovalStatus>(booking.status);

    return (
        <div className=" bg-white dark:bg-zinc-800 flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-start">
            <div>
            <h3 className="text-lg font-extrabold">{booking.model}</h3>
            <p className="text-sm font-bold text-muted-foreground">{booking.plate}</p>
            <p className="text-sm text-muted-foreground">{booking.statusDetails}</p>
            </div>
            <StatusBadge status={status}/>
        </div>

        {/* Driver & Supervisor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(booking.driver)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
                <p>{booking.driver}</p>
                <p className="text-xs text-muted-foreground">
                {booking.driverContact}
                </p>
            </div>
            </div>

            <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarFallback>
                {getInitials(booking.supervisor)}
                </AvatarFallback>
            </Avatar>
            <div className="text-sm">
                <p>{booking.supervisor}</p>
                <p className="text-xs text-muted-foreground">
                {booking.supervisorContact}
                </p>
            </div>
            </div>
        </div>

        {/* Office */}
        <p className="text-sm text-muted-foreground">
            Office: {booking.office}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
            <Button
            size="sm"
            onClick={() => setStatus("Accepted")}
            disabled={status !== "Waiting"}
            >
            Approve
            </Button>
            <Button
            size="sm"
            variant="destructive"
            onClick={() => setStatus("Rejected")}
            disabled={status !== "Waiting"}
            >
            Reject
            </Button>
        </div>
        </div>
    );
}
