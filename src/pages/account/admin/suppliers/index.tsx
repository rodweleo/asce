"use client"

import AdminLayout from "@/components/ui/admin-layout"

export default function AdminSupplierManagement() {
    return (
        <div>
            <h1>Suppliers Management</h1>
        </div>
    )
}

AdminSupplierManagement.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}