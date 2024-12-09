"use client"

import { TransactionWithId } from "@dfinity/ledger-icp"
import { Badge } from "./badge"
import { TableCell } from "./table"
import { timestampToReadable } from "@/utils/timestamp-to-readable"
import { formatAddress } from "@/utils/format-address"
import { Button } from "./button"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"
import { cn } from "@/lib/utils"
import { QrCode, ExternalLink } from "lucide-react"

export const AdminWalletTransactionListItem = ({ transaction, index }: {
    transaction: TransactionWithId,
    index: number
}) => {


    const { timestamp } = transaction.transaction;

    const readableTimestamp = timestampToReadable(timestamp ? timestamp[0].timestamp_nanos : BigInt(0))

    const transfer = transaction.transaction.operation.Transfer;

    // You can check if the operation is 'Transfer' before accessing its properties
    if (!transfer) {
        return <ApproveTransfer transaction={transaction} index={index} />;
    }

    const { from, to, amount, fee, spender } = transfer;

    const { e8s } = fee;





    return (
        <>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{Number(transaction.id)}</TableCell>
            <TableCell>
                <Badge>
                    transfer
                </Badge>
            </TableCell>
            <TableCell>{Number(amount.e8s) / 100000000}</TableCell>
            <TableCell>{Number(e8s) / 100000000}</TableCell>
            <TableCell>{Number(e8s) / 100000000}</TableCell>
            <TableCell>
                {formatAddress(from)}
            </TableCell>
            <TableCell>{formatAddress(to)}</TableCell>
            <TableCell>{spender.length > 0 ? formatAddress(spender[0]) : "N/A"}</TableCell>
            <TableCell>{readableTimestamp}</TableCell>
            <TableCell>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">View Transaction</Button>
                    </SheetTrigger>
                    <TransferSheetTxModal transaction={transaction} />
                </Sheet>
            </TableCell>
        </>
    )
}

const ApproveTransfer = ({ transaction, index }: {
    transaction: TransactionWithId,
    index: number
}) => {

    const { id } = transaction;

    const approve = transaction.transaction.operation.Approve;

    const { timestamp } = transaction.transaction;

    const readableTimestamp = timestampToReadable(timestamp && timestamp[0].timestamp_nanos)

    const { from, spender, to, allowance, fee } = approve

    const { e8s } = fee;

    return (
        <>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{Number(id)}</TableCell>
            <TableCell>
                <Badge className="bg-yellow-500 hover:bg-yellow-400">
                    approve
                </Badge>
            </TableCell>
            <TableCell>N/A</TableCell>
            <TableCell>
                {Number(e8s) / 100000000}
            </TableCell>
            <TableCell>{Number(allowance.e8s) / 100000000}</TableCell>
            <TableCell>{formatAddress(from)}</TableCell>
            <TableCell>{to ? formatAddress(to) : "N/A"}</TableCell>
            <TableCell>{spender.length > 0 ? formatAddress(spender) : "N/A"}</TableCell>
            <TableCell>{readableTimestamp}</TableCell>
            <TableCell>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">View Transaction</Button>
                    </SheetTrigger>
                    <ApproveSheetTxModal transaction={transaction} />
                </Sheet>

            </TableCell>
        </>
    )
}

const ApproveSheetTxModal = ({ transaction }: {
    transaction: TransactionWithId
}) => {

    const { id } = transaction;

    const approve = transaction.transaction.operation.Approve;

    const { timestamp } = transaction.transaction;

    const readableTimestamp = timestampToReadable(timestamp && timestamp[0].timestamp_nanos)

    const { from, spender, to, allowance, fee } = approve

    const { e8s } = fee;

    return (
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white">
            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center pt-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="w-24 h-24 text-gray-600" />
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <span className={cn(
                            "capitalize text-green-500"
                        )}>
                            {transaction.type} {transaction.status}
                        </span>

                    </div>
                    <time className="text-sm text-muted-foreground mt-1">{transaction.date}</time>
                    <div className="mt-4 text-center">
                        <div className="text-4xl font-bold">{transaction.amount} ICP</div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Thank you for using Asceflow
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-medium">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-medium">{transaction.network}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Block Number</span>
                        <span className="font-medium">{transaction.blockNumber}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">From</span>
                        <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {transaction.from}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">To</span>
                        <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {transaction.to}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Gas Used</span>
                        <span className="font-medium">{transaction.gasUsed}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Transaction Fee</span>
                        <span className="font-medium">{transaction.fee} ICP</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Nonce</span>
                        <span className="font-medium">{transaction.nonce}</span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" className="w-full">
                        View on Explorer
                    </Button>
                </div>
            </div>
        </SheetContent>

    )
}

const TransferSheetTxModal = ({ transaction }: {
    transaction: TransactionWithId
}) => {

    const { timestamp } = transaction.transaction;

    const readableTimestamp = timestampToReadable(timestamp ? timestamp[0].timestamp_nanos : BigInt(0))

    const transfer = transaction.transaction.operation.Transfer;

    if (!transfer) {
        return null;
    }

    const { to, amount, fee, spender } = transfer;

    const { e8s } = fee;


    return (
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white">
            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center pt-4">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="w-24 h-24 text-gray-600" />
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <span className={cn(
                            "capitalize text-green-500"
                        )}>

                        </span>

                    </div>
                    <time className="text-sm text-muted-foreground mt-1">{ }</time>
                    <div className="mt-4 text-center">
                        <div className="text-4xl font-bold">{ } ICP</div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Thank you for using Asceflow
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-medium">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-medium">ICP Mainnet</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Block Number</span>
                        <span className="font-medium">{ }</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">From</span>
                        <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                { }
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">To</span>
                        <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {to}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Gas Used</span>
                        <span className="font-medium">{ }</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Transaction Fee</span>
                        <span className="font-medium">{ } ICP</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Nonce</span>
                        <span className="font-medium">{ }</span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" className="w-full">
                        View on Explorer
                    </Button>
                </div>
            </div>
        </SheetContent>

    )
}

