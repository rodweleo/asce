"use client"

import { useState } from "react"
import AdminLayout from "@/components/ui/admin-layout"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MerchantSupplierList } from "@/components/ui/merchant-supplier-list"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import useMerchantSuppliersQuery from "@/hooks/user-merchant-suppliers"



export type Supplier = {
    id: string
    name: string
    location: string
    products: string[]
    phone: string
    email: string
}




export default function MerchantSupplierManagement() {

    const { suppliers } = useMerchantSuppliersQuery()

    const [searchTerm, setSearchTerm] = useState("")
    const [filterProduct, setFilterProduct] = useState<string | null>(null)

    const router = useRouter()
    const pathName = usePathname()

    const handleAddNewSupplier = () => {
        router.push(`${pathName}/add-supplier`)
    }

    return (
        <div className="space-y-8 w-full">
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">Search and Filter</h2>
                <div className="flex flex-wrap items-end w-full justify-between gap-10">
                    <Input
                        id="search"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm"
                    />
                    <div className="w-full max-w-sm">
                        <Label htmlFor="filter">Filter by Product</Label>
                        <Select
                            value={filterProduct || "All"}
                            onValueChange={(value) => setFilterProduct(value || null)}
                        >
                            <SelectTrigger id="filter">
                                <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Products</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                                <SelectItem value="Hardware">Hardware</SelectItem>
                                <SelectItem value="Tools">Tools</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={handleAddNewSupplier}><Plus /> Add New Supplier</Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                    <MerchantSupplierList suppliers={suppliers} />
                </CardContent>
            </Card>

        </div>
    )
}

MerchantSupplierManagement.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}