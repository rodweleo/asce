"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpRight } from 'lucide-react'
import toast from "react-hot-toast"
import { transferIcpToken } from "@/utils/icp-ledger-canister"
import { useAuth } from "./use-auth-client"

export function AdminSendTokens() {
    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState<number>(0)
    const [note, setNote] = useState("")

    const { signInWithPlugWallet } = useAuth()

    const handleSend = async (e) => {

        e.preventDefault()

        try {
            // const res = await transferIcpToken(recipient, amount);

            // if (!res) {
            //     toast.success('Tokens successfully sent to ' + recipient)
            // }


            //testing sending tokens using the plug wallet
            const requestTransferArg = {
                to: recipient,
                amount: amount * 100000000,
            };


            const { height } = await window.ic?.plug?.requestTransfer(requestTransferArg);


        } catch (e) {
            console.log(e)

            if (e === "Not connected") {
                if (typeof window !== "undefined") {
                    if (signInWithPlugWallet) {
                        signInWithPlugWallet()
                    }
                }
            }

            if (e.message) {
                toast.error(e.message)
            }
        }

    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className="w-full">
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Send
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Send Tokens</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSend} className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="recipient">Recipient Address</Label>
                        <Input
                            id="recipient"
                            placeholder="Enter recipient's wallet address"
                            value={recipient}
                            defaultValue="bifjr-ryd7w-amkmt-egjjs-ldxa4-flr5c-nsdlg-hdogn-aoaxx-y7kuy-fae"
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            type="number"
                            id="amount"
                            placeholder="Enter amount in ICP"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min={0}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Input
                            id="note"
                            placeholder="Add a note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Send Tokens</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

