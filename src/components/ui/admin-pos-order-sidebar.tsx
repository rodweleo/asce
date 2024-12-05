"use client"

import { Minus, Plus, Trash2, X } from 'lucide-react'
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
import { usePathname, useRouter } from "next/navigation"
import { getIcpAccountBalance } from '@/functions/get-icp-account-balance'
import toast from 'react-hot-toast'
import { useIcpAccount } from '@/hooks/useIcpAccount'
import { getAscecoinBalances } from '@/utils/icp-ledger-canister'

interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface OrderSidebarProps {
    items: OrderItem[]
    onUpdateQuantity: (id: string, change: number) => void
    onRemoveItem: (id: string) => void
    onClose?: () => void
}

export function AdminPosOrderSidebar({ items, onUpdateQuantity, onRemoveItem, onClose }: OrderSidebarProps) {
    const router = useRouter()
    const pathName = usePathname()

    const { balance, transactions, latestTransaction } = useIcpAccount("51ca91848db36e6588ecc8bbb491b7ba8ffb39c41b07f9b0874cc2c8b2966809");


    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    const handleCheckout = async () => {
        // router.push(`${pathName.concat("/checkout-success")}`)

        // const response = await getIcpAccountBalance("51ca91848db36e6588ecc8bbb491b7ba8ffb39c41b07f9b0874cc2c8b2966809")

        // toast.success(response)

        const response = await getAscecoinBalances();

        console.log(response)
    }

    return (
        <Card className="w-full w-1/2 sticky top-20 h-fit">
            <CardHeader>
                {onClose && (
                    <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 md:hidden">
                        <X className="h-4 w-4" />
                    </Button>
                )}
                <CardTitle>Orders</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Mon, Aug 26, 2023 | 17:00
                </p>
                <p className="text-sm text-muted-foreground">#0001234567</p>
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
                                        ${item.price.toFixed(2)}
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
                                    <span className="w-8 text-center">{item.quantity}</span>
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
                    <div className="flex justify-between">
                        <span>Payment method</span>
                        <Select defaultValue="cash">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="qris">QRIS</SelectItem>
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
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Payment
                </Button>
            </CardFooter>
        </Card>
    )
}

