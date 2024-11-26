"use client"

import { ReactElement, useEffect, useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Plus, Search } from 'lucide-react'
import AdminLayout from "../../../../components/ui/admin-layout"
import { AdminInventoryProductList } from "@/components/ui/admin-inventory-product-list"

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
                        <Plus className="h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <AdminInventoryProductList products={inventoryItems} />
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