"use client"

import { ReactElement, useEffect, useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Plus, Search } from 'lucide-react'
import AdminLayout from "../../../../components/ui/admin-layout"
import { AdminInventoryProductList } from "@/components/ui/admin-inventory-product-list"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"
import useMerchantProductsQuery from "@/hooks/use-merchant-products"
import { Loader } from "@/components/ui/loader"


export default function AdminInventoryManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()
    const pathName = usePathname()

    const { products, isFetching } = useMerchantProductsQuery();

    useEffect(() => {
        document.title = "Inventory | asceflow.ai"
    }, [])


    const handleAddProduct = () => {
        router.push(`${pathName}/add-product`)
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
                    <CardTitle>
                        <div className="flex items-center gap-2.5">
                            Products {isFetching ? <Loader /> : null}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <AdminInventoryProductList products={products} />
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