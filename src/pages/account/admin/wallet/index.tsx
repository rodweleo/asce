"use client"

import AdminLayout from '@/components/ui/admin-layout';
import { AdminWalletDashboard } from '@/components/ui/admin-wallet-dashboard';
import { AdminTransactionHistory } from '@/components/ui/admin-wallet-transaction-history';
import useActivePageName from '@/hooks/use-active-page-name'
import { useEffect } from 'react';

export default function AdminWalletPage() {
    const { setActivePageName } = useActivePageName();



    useEffect(() => {
        document.title = "Wallet | asceflow.ai"

        setActivePageName("Wallet")
    }, [])

    return (
        <div className="min-h-screen w-full space-y-5">
            <AdminWalletDashboard />
            <AdminTransactionHistory />
        </div>
    )
}

AdminWalletPage.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

