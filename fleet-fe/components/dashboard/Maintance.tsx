import { Badge } from "@/components/ui/badge";

import { differenceInMonths } from "date-fns";

const SERVICE_MONTHS = 6;
const SERVICE_KM = 5000;

const vehicles = [
  {
    plate: "B 1234 XYZ",
    vehicle: "Toyota Hilux",
    lastServiceDate: "2024-07-01",
    currentKm: 45600,
    lastServiceKm: 39000,
  },
  {
    plate: "A 9876 ABC",
    vehicle: "Isuzu ELF",
    lastServiceDate: "2024-06-15",
    currentKm: 62200,
    lastServiceKm: 55000,
  },
  {
    plate: "C 4321 DEF",
    vehicle: "Mitsubishi Pajero",
    lastServiceDate: "2024-10-10",
    currentKm: 29800,
    lastServiceKm: 25000,
  },
];

export function MaintenanceDue() {
  const today = new Date();

  const dueVehicles = vehicles.filter((v) => {
    const monthsDiff = differenceInMonths(
      today,
      new Date(v.lastServiceDate)
    );
    const kmDiff = v.currentKm - v.lastServiceKm;

    return (
      monthsDiff >= SERVICE_MONTHS || kmDiff >= SERVICE_KM
    );
  });

  return (
    <div className="">
        {dueVehicles.length === 0 ? (
            <p className="text-sm text-muted-foreground">
            All vehicles are in good condition.
            </p>
        ) : (
            <div className="space-y-3">
            {dueVehicles.map((v) => {
                const kmDiff = v.currentKm - v.lastServiceKm;

                return (
                <div
                    key={v.plate}
                    className="flex items-center justify-between rounded-md border p-3"
                >
                    <div>
                    <p className="font-medium">
                        {v.vehicle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {v.plate}
                    </p>
                    </div>

                    <div className="flex gap-2">
                    {kmDiff >= SERVICE_KM && (
                        <Badge variant="destructive">
                        KM Exceeded
                        </Badge>
                    )}
                    {differenceInMonths(
                        today,
                        new Date(v.lastServiceDate)
                    ) >= SERVICE_MONTHS && (
                        <Badge variant="secondary">
                        6 Months
                        </Badge>
                    )}
                    </div>
                </div>
                );
            })}
            </div>
        )}
    </div>
  );
}
