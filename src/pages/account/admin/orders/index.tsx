"use client"

import { ReactElement, useState } from 'react'
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Search } from 'lucide-react'
import AdminLayout from '../../../../components/ui/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MerchantOrderList } from '@/components/ui/merchant-order-list'
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import useMerchantSalesQuery from '@/hooks/use-merchant-sales'


export default function AdminOrderManagement() {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const router = useRouter()
    const pathName = usePathname()


    const { sales } = useMerchantSalesQuery()

    const handleCreateOrder = () => {
        router.push(`${pathName}/create-order`)
    }


    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6 text-black">Order Management</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                    />
                    <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                    <Button onClick={handleCreateOrder}>
                        <Plus className="h-4 w-4" /> Create New Order
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <MerchantOrderList orders={sales} />
                </CardContent>
            </Card>
        </div>
    )
}

AdminOrderManagement.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};