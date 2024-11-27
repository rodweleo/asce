"use client"

import AdminLayout from '@/components/ui/admin-layout'
import { MerchantCreateOrderForm } from '@/components/ui/merchant-create-order-form'
import { ReactElement, useEffect } from "react"

export default function MerchantCreateOrderPage() {

    useEffect(() => {
        document.title = "Create New order | asceflow.ai"
    }, [])
    return (
        <div className='w-full min-h-screen'>
            <main className="container mx-auto py-10 w-full h-full">
                <MerchantCreateOrderForm />
            </main>
        </div>
    )
}

MerchantCreateOrderPage.getLayout = function (page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}