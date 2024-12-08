import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, Copy, List, ArrowDownLeft } from 'lucide-react'

export function AdminReceiveTokens() {
    const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(walletAddress)
        // Implement a toast notification here
    }

    const handleViewTransactions = () => {
        // Implement view transactions logic here
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Receive Tokens</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                        <QrCode size={160} />
                    </div>
                    <p className="text-sm text-center break-all">{walletAddress}</p>
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button variant="outline" onClick={handleCopyAddress}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Address
                    </Button>
                    <Button variant="outline" onClick={handleViewTransactions}>
                        <List className="mr-2 h-4 w-4" /> View Transactions
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

