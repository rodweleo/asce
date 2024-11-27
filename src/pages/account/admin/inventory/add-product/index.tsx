"use client"

import { AdminAddInventoryProductForm } from "@/components/ui/admin-add-inventory-product-form"
import AdminLayout from "@/components/ui/admin-layout"
import { ReactElement, useEffect } from "react"

export default function AddProductPage() {

    useEffect(() => {
        document.title = "Add product | asceflow.ai"
    }, [])

    return (
        <div className="container mx-auto">
            <AdminAddInventoryProductForm />
        </div>
    )
}

AddProductPage.getLayout = function (page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
