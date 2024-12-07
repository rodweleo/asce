"use client"

import AdminLayout from "@/components/ui/admin-layout"
import { AdminPosCategorySidebar } from "@/components/ui/admin-pos-category-sidebar"
import { AdminPosOrderSidebar } from "@/components/ui/admin-pos-order-sidebar"
import { AdminPosProductDisplay } from "@/components/ui/admin-pos-product-display"
import { Product } from "@/declarations/bizpro-backend/bizpro-backend.did"
import useActivePageName from "@/hooks/use-active-page-name"

import { useState, useEffect } from "react"


interface OrderItem {
    id: string
    name: string
    price: bigint
    quantity: bigint
}


export default function AdminPointOfSale() {
    const { setActivePageName } = useActivePageName()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    useEffect(() => {

        document.title = "Point of Sale | asceflow.ai"
        setActivePageName("Point of Sale")

    
    }, [])


    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category)
    }

    const handleAddToOrder = (product: Product) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: BigInt(Number(item.quantity) + 1) }
                        : item
                )
            } else {
                return [...prevItems, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
            }
        })
      
    }

    const handleUpdateQuantity = (id: string, change: number) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: BigInt(Math.max(0, Number(item.quantity) + change)) }
                    : item
            ).filter((item) => Number(item.quantity) > 0)
        )
    }

    const handleRemoveItem = (id: string) => {
        setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }


    return (
        <div className="relative flex gap-5 w-full h-screen">
            <AdminPosCategorySidebar
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            <AdminPosProductDisplay
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onAddToOrder={handleAddToOrder}
            />
            <AdminPosOrderSidebar
                items={orderItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                
            />
        </div>
    )
}

AdminPointOfSale.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}