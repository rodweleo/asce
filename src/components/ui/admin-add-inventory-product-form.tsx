"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from "./card"
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor"
import { useAuth } from "./use-auth-client";
import { convertToBase64 } from "@/utils";
import { Loader2 } from "lucide-react"
import { Product } from "@/declarations/bizpro-backend/bizpro-backend.did";



const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Product description must be at least 10 characters.",
    }),
    price: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Price must be a valid number.",
    }),
    quantity: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Quantity must be a valid number.",
    }),
    category: z.string({
        required_error: "Please select a product category.",
    }),
    image: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "only .jpg, .jpeg, .png, .webp and .gif files are accepted."
        ),
});

export function AdminAddInventoryProductForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { principal } = useAuth()

    type FormData = z.infer<typeof formSchema>
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true)

            const newProduct: Product = {
                id: uuidv4(),
                businessId: principal!,
                name: values.name,
                description: values.description,
                quantity: BigInt(values.quantity),
                category: values.category,
                image: imagePreview!,
                price: BigInt(values.price)
            }
            const res = await AsceflowBackendActor.addOrUpdateProduct(newProduct);

            toast.success(res)
        } catch (e) {
            toast.error(e.message)
        } finally {
            setIsSubmitting(false)
        }

    }


    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Add New Product</CardTitle>
                        <CardDescription>Provide the details of your product below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the name that will be displayed for your product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter product description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a detailed description of your product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter price" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the price of your product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter quantity" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the quantity of your product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="electronics">Electronics</SelectItem>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="books">Books</SelectItem>
                                                <SelectItem value="home">Home & Garden</SelectItem>
                                                <SelectItem value="toys">Toys & Games</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select the category that best fits your product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field: { onChange, value, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        onChange(e.target.files)
                                                        const imageBase64 = await convertToBase64(file);
                                                        setImagePreview(imageBase64 as string)
                                                    }
                                                }}
                                                {...rest}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Upload an image of your product. Max file size: 5MB.
                                        </FormDescription>
                                        <FormMessage />
                                        {imagePreview && (
                                            <div className="mt-4">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Product preview"
                                                    width={200}
                                                    height={200}
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <div className="flex items-center gap-2.5">
                                <Loader2 className="animate-spin" /> Adding Product...
                            </div> : <span>Add Product</span>}
                        </Button>
                    </CardFooter>
                </form>

            </Form>
        </Card>
    )
}