import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, Copy, ArrowDownLeft } from 'lucide-react'
import { useAuth } from "./use-auth-client"
import toast from "react-hot-toast"

export function AdminReceiveTokens() {

    const { principal } = useAuth()

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(principal!.toText()).then(() => {
            toast.success("Wallet address copied")
        }).catch(() => {
            toast.error("Error coping wallet principal")
        })
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
                    <p className="text-sm text-center break-all select-none">{principal?.toText()}</p>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button variant="outline" onClick={handleCopyAddress}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Address
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

