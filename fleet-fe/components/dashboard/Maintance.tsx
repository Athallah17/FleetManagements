"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export function MaintenanceVehicles() {
  const { data } = useDashboard();
  if (!data) return <p>Loading...</p>;

  if (!data.maintenanceVehicles.length) return <p>No vehicles under maintenance</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Plate Number</TableCell>
          <TableCell>Model</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Last Service</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.maintenanceVehicles.map(vehicle => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.plateNumber}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.status}</TableCell>
            <TableCell>{vehicle.lastService ? new Date(vehicle.lastService).toLocaleDateString() : "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
