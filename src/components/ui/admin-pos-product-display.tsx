import Image from "next/image"
import { Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "./input"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    itemCount: number
    category: string
}

const products: Product[] = [
    {
        id: "1",
        name: "Haworthia",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua.",
        price: 50.0,
        image: "/placeholder.svg",
        itemCount: 11,
        category: "Succulents"
    },
    {
        id: "2",
        name: "Aspidistra",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua.",
        price: 50.0,
        image: "/placeholder.svg",
        itemCount: 15,
        category: "Indoor Plants"
    },
    {
        id: "3",
        name: "Alocasia Wentii",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua.",
        price: 50.0,
        image: "/placeholder.svg",
        itemCount: 8,
        category: "Indoor Plants"
    },
    {
        id: "4",
        name: "Echinodorus",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua.",
        price: 50.0,
        image: "/placeholder.svg",
        itemCount: 12,
        category: "Aquatic Plants"
    },
]

interface ProductGridProps {
    searchTerm: string
    selectedCategory: string
    onAddToOrder: (product: Product) => void
}

export function AdminPosProductDisplay({ searchTerm, selectedCategory, onAddToOrder }: ProductGridProps) {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    )

    return (
        <Card className="px-4 space-y-5 w-full overflow-y-scroll h-[800px]">
            <CardHeader className="sticky top-0 bg-white">
                <div className="relative bg-white">
                    <Search className="absolute left-2 top-[13px] h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Product..."
                        className="pl-8"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-5 w-full h-full">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="flex flex-col w-full max-w-xs">
                            <CardHeader className="p-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={200}
                                    className="rounded-t-lg h-48 w-full object-cover"
                                />
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {product.itemCount} items
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4">
                                <Button
                                    className="w-full"
                                    onClick={() => onAddToOrder(product)}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add to Order
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

