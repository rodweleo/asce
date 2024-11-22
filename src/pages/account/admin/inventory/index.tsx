"use client"

import { ReactElement, useEffect, useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table"
import { ArrowUpDown, Download, Plus, Search, Upload } from 'lucide-react'
import AdminLayout from "../../../../components/ui/admin-layout"

const inventoryItems = [
    { id: 1, name: "Product A", sku: "SKU001", quantity: 100, status: "In Stock" },
    { id: 2, name: "Product B", sku: "SKU002", quantity: 50, status: "Low Stock" },
    { id: 3, name: "Product C", sku: "SKU003", quantity: 0, status: "Out of Stock" },
    { id: 4, name: "Product D", sku: "SKU004", quantity: 75, status: "In Stock" },
    { id: 5, name: "Product E", sku: "SKU005", quantity: 25, status: "Low Stock" },
]

export default function AdminInventoryManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")


    useEffect(() => {
        document.title = "Inventory | BizPro"
    }, [])
    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedItems = [...inventoryItems].sort((a, b) => {
        if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
            return sortDirection === "asc" ? -1 : 1
        }
        if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
            return sortDirection === "asc" ? 1 : -1
        }
        return 0
    })

    const filteredItems = sortedItems.filter(
        item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddProduct = () => {

    }

    const handleImport = () => {

    }

    const handleExport = () => {

    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                    />
                    <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={handleAddProduct}>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                    <Button variant="outline" onClick={handleImport}>
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                                    Product Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                </TableHead>
                                <TableHead onClick={() => handleSort("sku")} className="cursor-pointer">
                                    SKU <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                </TableHead>
                                <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer">
                                    Quantity <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                </TableHead>
                                <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                                    Status <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === "In Stock"
                                                ? "bg-green-100 text-green-800"
                                                : item.status === "Low Stock"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                        <Button variant="ghost" size="sm">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

AdminInventoryManagement.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};