"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpRight } from 'lucide-react'

export function AdminSendTokens() {
    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState("")
    const [note, setNote] = useState("")

    const handleSend = () => {
        // Implement send logic here
        console.log("Sending tokens:", { recipient, amount, note })
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
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="recipient">Recipient Address</Label>
                        <Input
                            id="recipient"
                            placeholder="Enter recipient's wallet address"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            placeholder="Enter amount in ICP"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
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
                </div>
                <DialogFooter>
                    <Button onClick={handleSend}>Send Tokens</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

