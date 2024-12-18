"use client"

import AdminLayout from "@/components/ui/admin-layout"

export default function AdminInvoiceManagement() {
    return (
        <div>
            <h1>Invoice Management</h1>
        </div>
    )
}

AdminInvoiceManagement.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}