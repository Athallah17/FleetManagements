"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/statusbadge";
import { useAssets } from "@/hooks/useAsset";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function AssetContent() {
  const { vehicles, loading, error, page, total, limit, setPage, fetchVehicles } = useAssets();

  useEffect(() => {
    fetchVehicles(); // make sure this updates the state in your hook
  }, [page, fetchVehicles]); // add fetchVehicles to deps to prevent stale closure

  if (loading) return <p className="text-center py-6">Loading vehicles...</p>;
  if (error) return <p className="text-center py-6 text-red-500">{error}</p>;
  if (!vehicles || vehicles.length === 0) return <p className="text-center py-6">No vehicles found.</p>;

  const totalPages = Math.ceil(total / limit);

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault();
              setPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <div>
      <Table className="text-sm">
        <TableCaption>List of company vehicles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fuel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Km</TableHead>
            <TableHead>Last Service</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.code}</TableCell>
              <TableCell>{v.plateNumber}</TableCell>
              <TableCell>{v.model}</TableCell>
              <TableCell>{v.type}</TableCell>
              <TableCell>{v.fuelType}</TableCell>
              <TableCell>
                <StatusBadge status={v.status} />
              </TableCell>
              <TableCell>{v.totalKm.toLocaleString()} km</TableCell>
              <TableCell>{v.lastService ? new Date(v.lastService).toLocaleDateString() : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {totalPages > 5 ? (
              <>
                {page > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setPage(1); }}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {[page - 1, page, page + 1].map((p) => {
                  if (p < 1 || p > totalPages) return null;
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === page}
                        onClick={(e) => { e.preventDefault(); setPage(p); }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {page < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setPage(totalPages); }}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
              </>
            ) : (
              renderPages()
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
