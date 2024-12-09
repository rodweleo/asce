import { TransactionWithId } from "@dfinity/ledger-icp"
import { AdminWalletTransactionListItem } from "./admin-wallet-transaction-list-item"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./table"

export const AdminWalletTransactionList = ({ transactions }: { transactions: TransactionWithId[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Allowance</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Spender</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction, index: number) => (
                    <TableRow key={transaction.id}>
                        <AdminWalletTransactionListItem transaction={transaction} index={index} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}