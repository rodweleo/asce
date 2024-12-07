"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import useMerchantProductsQuery from "@/hooks/use-merchant-products"

interface Category {
    name: string
    count: number
    icon?: string
}



interface CategorySidebarProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export function AdminPosCategorySidebar({ selectedCategory, onSelectCategory }: CategorySidebarProps) {

    const { products } = useMerchantProductsQuery()

    const categories: Category[] = [
        { name: "All", count: products.length },
    ]

    return (
        <Card className="w-1/3 h-fit sticky top-20">
            <CardHeader>
                <CardTitle>
                    Category
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <Button
                                key={category.name}
                                variant={selectedCategory === category.name ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => onSelectCategory(category.name)}
                            >
                                <span>{category.name}</span>
                                {category.count > 0 && (
                                    <span className="ml-auto text-muted-foreground text-sm">
                                        {category.count}
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

