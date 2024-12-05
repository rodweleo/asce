"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AdminLayout from "@/components/ui/admin-layout"
import * as React from "react"

export default function AdminPosCheckoutSuccessPage() {
    return (
        <div className="min-h-screen flex justify-center w-full">
            <Card className="w-full max-w-2xl h-fit">
                <CardHeader className="text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Transaction Successful!</CardTitle>
                    <p className="text-muted-foreground">
                        Your order has been successfully processed
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <Image
                            src="/placeholder.svg"
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="border p-2 rounded-lg"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Transaction ID</span>
                            <span className="font-medium">#0001234567</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date & Time</span>
                            <span className="font-medium">Mon, Aug 26, 2023 | 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Payment Method</span>
                            <span className="font-medium">QRIS</span>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>$150.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax (10%)</span>
                                <span>$15.00</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>$165.00</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link href="/account/admin/pos">New Transaction</Link>
                    </Button>
                    <Button variant="outline">Download Receipt</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

AdminPosCheckoutSuccessPage.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}