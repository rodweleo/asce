
import { useIcpAccount } from "@/hooks/useIcpAccount";
import { AdminWalletTransactionList } from "./admin-wallet-transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "./card"


export function AdminTransactionHistory() {

    const { transactions } = useIcpAccount("51ca91848db36e6588ecc8bbb491b7ba8ffb39c41b07f9b0874cc2c8b2966809");

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
                <AdminWalletTransactionList transactions={transactions} />
            </CardContent>
        </Card>
    )
}

