"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface Category {
    name: string
    count: number
    icon?: string
}

const categories: Category[] = [
    { name: "All", count: 0 },
    { name: "Succulents", count: 200 },
    { name: "Indoor Plants", count: 45 },
    { name: "Aquatic Plants", count: 120 },
    { name: "Trees", count: 80 },
    { name: "Climbers", count: 65 },
    { name: "Creepers", count: 70 },
    { name: "Bamboo", count: 30 },
]

interface CategorySidebarProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export function AdminPosCategorySidebar({ selectedCategory, onSelectCategory }: CategorySidebarProps) {
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

