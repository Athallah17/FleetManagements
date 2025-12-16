import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ApprovalCard } from '@/components/approvals/ContentCard'
import  {approvalData}  from "@/components/approvals/data/mockdata"

export default function ApprovalPage () {
    return (
        <div className='min-h-screen p-6 bg-gray-50'>
            <div>
                <h1 className='text-2xl font-bold tracking-tight'>
                    Approval Pages
                </h1>
                <p className='text-muted-foreground'>List of Pending Approval Need To Be Review</p>
            </div>
            <div className='my-4 flex items-end justify-between sm:my=0 sm:items-center'>
                <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
                    {/* Input Components */}
                    Search Input
                </div>
            </div>
            <Separator/>
            {/* Approval Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {approvalData.map((booking, index) => (
                    <Card key={index}>
                        <CardContent>
                            <ApprovalCard booking={booking} />
                        </CardContent>
                    </Card>
                    ))}
                </div>
        </div>
    )
}