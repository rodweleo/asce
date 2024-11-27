"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "./card"
import AsceflowBackendActor from "@/utils/AsceflowBackendActor"
import { v4 as uuidv4 } from 'uuid';
import { Supplier } from "@/declarations/bizpro-backend/bizpro-backend.did"
import { useAuth } from "./use-auth-client"
import { toast } from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Supplier name must be at least 2 characters.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    products: z.array(z.string()).min(1, {
        message: "Select at least one product.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export function AddSupplierForm() {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const { principal } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: "",
            products: [],
            phone: "",
            email: "",
        },
    })

    const handleProductChange = (product: string) => {
        const currentProducts = form.getValues("products");
        const updatedProducts = currentProducts.includes(product)
            ? currentProducts.filter((p) => p !== product)
            : [...currentProducts, product];
        form.setValue("products", updatedProducts);
    }


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const newSupplier: Supplier = {
                id: uuidv4(),
                name: values.name,
                email: values.email,
                merchants: [principal!],
                phone: values.phone,
                products: values.products,
                location: values.location
            }

            const res = await AsceflowBackendActor.addSupplier(newSupplier);

            toast.success(res);

        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} >
                    <CardHeader>
                        <CardTitle>Add New Supplier</CardTitle>
                        <CardDescription>Kindly fill in the details of the supplier below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Supplier Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter supplier name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="products"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Products Supplied</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-2">
                                                {["Electronics", "Accessories", "Hardware", "Tools", "Furniture", "Food Items"].map((product) => (
                                                    <Button
                                                        key={product}
                                                        type="button"
                                                        variant={field.value.includes(product) ? "default" : "outline"}
                                                        onClick={() => handleProductChange(product)}
                                                    >
                                                        {product}
                                                    </Button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormDescription>Select all that apply</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Add Supplier</Button>
                        </div>
                    </CardFooter>

                </form>
            </Form>
        </Card>
    )
}

