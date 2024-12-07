"use client"

import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AsceflowBackendActor from '@/utils/AsceflowBackendActor'
import { useAuth } from './use-auth-client'
import { v4 as uuidV4 } from 'uuid'
import { Separator } from './separator'
import { transferIcpToken } from '@/utils/icp-ledger-canister'
import { Sale } from '@/declarations/bizpro-backend/bizpro-backend.did'
import { Principal } from '@dfinity/principal'

interface OrderItem {
    id: string
    name: string
    price: bigint
    quantity: bigint
}

interface OrderSidebarProps {
    items: OrderItem[]
    onUpdateQuantity: (id: string, change: number) => void
    onRemoveItem: (id: string) => void
}

export function AdminPosOrderSidebar({ items, onUpdateQuantity, onRemoveItem }: OrderSidebarProps) {

    const [customerPrincipal, setCustomerPrincipal] = useState("");
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("ascecoin")

    const { principal } = useAuth()

    const subtotal = items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax
    const loyaltyTokens = (0.01 * total)

    const handleCheckout = async () => {

        //step 1: first complete the sending of token from the active principal to another principal
        const blockHeight = await transferIcpToken(customerPrincipal, loyaltyTokens);

        if (blockHeight) {
            toast.success(`${customerPrincipal} will receive loyalty tokens worth ${loyaltyTokens} ICP tokens in a few minutes...`)
        }

        //step 2: save the sale order in the canister
        const newSale: Sale = {
            id: uuidV4(),
            paymentMethod: paymentMethod,
            businessId: principal!,
            totalAmount: BigInt(total),
            timestamp: new Date().toLocaleTimeString(),
            customerId: Principal.fromText(customerPrincipal),
            products: items.map((orderItem) => orderItem.id),

        }

        try {
            const response = await AsceflowBackendActor.addOrUpdateSale(newSale);

            toast.success(response)
        } catch (e) {
            toast.error(e.message())
        }

        //step 3: send the notification to the customer informing the user of the transfer done
        try {
            const response = await AsceflowBackendActor.sendMailNotification(customerName, customerEmail, customerPrincipal, BigInt(total), principal!.toText(), "Asceflow", new Date().toISOString());

            toast.success(response)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <Card className="w-full w-1/2 sticky top-20 h-fit">
            <CardHeader className="tracking-wide">
                <CardTitle>Orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                    <span className="font-bold">Date:</span> {new Date().toDateString()}
                </p>
                <p className="text-sm text-muted-foreground"><span className="font-bold">Order ID:</span> {uuidV4()}</p>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-screen max-h-[350px]">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        ${Number(item.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{Number(item.quantity)}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span>Payment method</span>
                        <Select defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value)} >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="ascecoin">Ascecoin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax 10%</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                            Proceed to Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Enter Customer Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    className="col-span-3"
                                    onChange={(e) => setCustomerName(e.currentTarget.value)}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="abc@example.com"
                                    className="col-span-3"
                                    onChange={(e) => setCustomerEmail(e.currentTarget.value)}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Principal
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="2vxsx-fae"
                                    className="col-span-3"
                                    onChange={(e) => setCustomerPrincipal(e.currentTarget.value)}
                                />
                            </div>

                        </div>
                        <Separator />
                        <DialogFooter>
                            <div className="space-y-4 flex flex-col w-full items-end">
                                <p className="text-sm text-neutral-500">After completion of the payment, the customer will receive <span className="text-blue-500 font-bold">Loyalty Tokens</span> worth <span className="font-bold text-blue-500">{loyaltyTokens}</span> ICP Tokens.  </p>
                                <Button type="submit" className="w-fit" onClick={handleCheckout}>Complete Payment</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </CardFooter>
        </Card>
    )
}

