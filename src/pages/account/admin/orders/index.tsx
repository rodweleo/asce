"use client"

import { ReactElement, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye } from 'lucide-react'
import AdminLayout from '@/components/ui/admin-layout'

const mockOrders = [
    { id: 1, customer: 'John Doe', total: 150.00, status: 'Pending', date: '2023-05-01' },
    { id: 2, customer: 'Jane Smith', total: 250.50, status: 'Processing', date: '2023-05-02' },
    { id: 3, customer: 'Bob Johnson', total: 75.25, status: 'Shipped', date: '2023-05-03' },
]

export default function AdminOrderManagement() {
    const [orders, setOrders] = useState(mockOrders)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const handleViewOrder = (id: number) => {
        console.log(id)
    }

    const handleUpdateStatus = (id: number, newStatus: string) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ))
        
    }

    const filteredOrders = orders.filter(order =>
        (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm)) &&
        (statusFilter === 'All' || order.status === statusFilter)
    )

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>
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
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order.id)}>
                                    <Eye className="h-4 w-4 mr-2" /> View
                                </Button>
                                <Select
                                    value={order.status}
                                    onValueChange={(newStatus) => handleUpdateStatus(order.id, newStatus)}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Processing">Processing</SelectItem>
                                        <SelectItem value="Shipped">Shipped</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

AdminOrderManagement.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};