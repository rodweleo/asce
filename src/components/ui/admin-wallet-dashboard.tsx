"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSendTokens } from "./admin-send-tokens"
import { AdminReceiveTokens } from "./admin-receive-tokens"
import { AdminTokenExchange } from "./admin-token-exchange"
import { useIcpAccount } from "@/hooks/useIcpAccount"

export function AdminWalletDashboard() {

    const { balance, transactions } = useIcpAccount("51ca91848db36e6588ecc8bbb491b7ba8ffb39c41b07f9b0874cc2c8b2966809");
    return (
        <div className="flex-1 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Wallet Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{balance} ICP</div>
                        <p className="text-xs text-muted-foreground">
                            $5,678.90 USD
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{transactions.length}</div>
                        <p className="text-xs text-muted-foreground">
                            +5 from last week
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <AdminSendTokens />
                <AdminReceiveTokens />
                <AdminTokenExchange />
            </div>
        </div>
    )
}

