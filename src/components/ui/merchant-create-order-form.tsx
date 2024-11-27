"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Product } from "@/utils/api"
import { MerchantProductCard } from "@/components/ui/merchant-product-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SelectedProductCard } from "@/components/ui/selected-product-card"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "./card"
import { Banknote } from "lucide-react"
import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor"
import toast from "react-hot-toast"
import { useAuth } from "./use-auth-client"
import useMerchantProductsQuery from "@/hooks/use-merchant-products"

const formSchema = z.object({
    business: z.string().min(1, "Business ID is required"),
    customer: z.string().optional(),
    paymentMethod: z.string().min(1, "Payment method is required"),
})

export function MerchantCreateOrderForm() {
    const { products } = useMerchantProductsQuery()

    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [totalAmount, setTotalAmount] = useState(0)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            business: "",
            customer: "",
            paymentMethod: "ascecoin",
        },
    })

    const { principal } = useAuth()


    useEffect(() => {
        const total = selectedProducts.reduce((sum, product) => sum + Number(product.price), 0)
        setTotalAmount(total)
    }, [selectedProducts])

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleProductSelect = (product) => {
        setSelectedProducts(prev =>
            prev.some(p => p.id === product.id)
                ? prev.filter(p => p.id !== product.id)
                : [...prev, product]
        )
    }

    const handleProductDeselect = (product) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== product.id))
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (selectedProducts.length === 0) {
            alert("Please select at least one product")
            return
        }

        const productIds = selectedProducts.map(product => product.id);

        const timestamp = new Date().toISOString();

        try {
            const res = await AsceflowBackendActor.addSale(uuidv4(), principal!, values.customer || "", productIds, BigInt(Math.round(totalAmount)), values.paymentMethod, timestamp);
            toast.success(res)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form {...form}>
                    <Card className="h-fit">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardHeader>
                                <CardTitle>Create New Order</CardTitle>
                                <CardDescription>Enter the details for the order below</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="business"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter business ID" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter customer ID" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Method</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a payment method" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="cash">
                                                            <div className="flex items-center gap-2.5">
                                                                <Banknote /> Cash
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="ascecoin">
                                                            <div className="flex items-center gap-2.5">
                                                                <Image src="/logos/ASCECOIN LOGO.png" width={15} height={15} alt="Ascecoin" /> Ascecoin
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex flex-col gap-2.5">
                                    <div>
                                        <FormLabel>Total Amount</FormLabel>
                                        <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                                    </div>
                                    <Button type="submit">Create Order</Button>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </Form>
                <Card>
                    <CardHeader>
                        <CardTitle>Select Products</CardTitle>
                        <CardDescription>
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-4"
                            />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px]">
                            <div className="grid grid-cols-1 gap-4">
                                {filteredProducts.map((product) => (
                                    <MerchantProductCard
                                        key={product.id}
                                        product={product}
                                        onSelect={handleProductSelect}
                                        isSelected={selectedProducts.some(p => p.id === product.id)}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div >
            <Card>
                <CardHeader>
                    <CardTitle>Selected Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                            {selectedProducts.map((product) => (
                                <SelectedProductCard
                                    key={product.id}
                                    product={product}
                                    onDeselect={handleProductDeselect}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div >
    )
}

