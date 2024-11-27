"use client"

import { AddSupplierForm } from "@/components/ui/add-supplier-form"
import AdminLayout from "@/components/ui/admin-layout"

import { ReactElement, useEffect } from "react"

export default function MerchantAddSupplierPage() {

    useEffect(() => {
        document.title = "Add New Supplier | asceflow.ai"
    }, [])
    return (
        <div className="min-h-screen w-full">
            <main className="w-full h-full">
                <AddSupplierForm />
            </main>
        </div>
    )
}

MerchantAddSupplierPage.getLayout = (page: ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}