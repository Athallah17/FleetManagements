'use client'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ApprovalCard } from '@/components/approvals/ContentCard'
import { usePendingApprovals } from "@/hooks/useApproval";
import { useUser } from '@/context/userContext';

export default function ApprovalPage() {
  const { user } = useUser(); // get logged-in user
  const { data: bookings, isLoading, isError } = usePendingApprovals();

  if (!user) return <p>Please login to view approvals</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
        {/* <p>Welcome, {user.name} </p>
        <p>Welcome, {user.role} </p> */}
        <h1 className="text-2xl font-bold tracking-tight">Approval Pages</h1>
        <p className="text-muted-foreground">
          List of pending approvals that need to be reviewed
        </p>
      </div>

      <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
          {/* Search input placeholder */}
          Search Input
        </div>
      </div>

      <Separator className='mt-4 mb-4'/>

      {/* Approval Cards */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load pending approvals</p>}
      {bookings && bookings.length === 0 && <p>No pending approvals</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {bookings?.map((booking) => (
          <Card key={booking.id}>
            <CardContent>
              <ApprovalCard booking={booking} role={user.role} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
