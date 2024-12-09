import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw } from 'lucide-react'

export function AdminTokenExchange() {
    const [fromToken, setFromToken] = useState("ICP")
    const [toToken, setToToken] = useState("USDT")
    const [amount, setAmount] = useState("")

    const handleExchange = () => {
        // Implement exchange logic here
        console.log("Exchanging tokens:", { fromToken, toToken, amount })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" /> Exchange
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Exchange Tokens</DialogTitle>
                </DialogHeader>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="fromToken">From</Label>
                        <Select value={fromToken} onValueChange={setFromToken}>
                            <SelectTrigger id="fromToken">
                                <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="ICP">ICP</SelectItem>
                                <SelectItem value="USDT">USDT</SelectItem>
                                <SelectItem value="ETH">ETH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="toToken">To</Label>
                        <Select value={toToken} onValueChange={setToToken}>
                            <SelectTrigger id="toToken">
                                <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="ICP">ICP</SelectItem>
                                <SelectItem value="USDT">USDT</SelectItem>
                                <SelectItem value="ETH">ETH</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleExchange}>Exchange Tokens</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

