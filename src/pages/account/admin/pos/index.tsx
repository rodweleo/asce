"use client"

import AdminLayout from "@/components/ui/admin-layout"
import { AdminPointOfSaleHeader } from "@/components/ui/admin-point-of-sale-header"
import { AdminPosCategorySidebar } from "@/components/ui/admin-pos-category-sidebar"
import { AdminPosOrderSidebar } from "@/components/ui/admin-pos-order-sidebar"
import { AdminPosProductDisplay } from "@/components/ui/admin-pos-product-display"
import useActivePageName from "@/hooks/use-active-page-name"

import { useState, useEffect } from "react"


interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface Product {
    id: string
    name: string
    price: number
    description: string
    image: string
    itemCount: number
    category: string
}

export default function AdminPointOfSale() {
    const { setActivePageName } = useActivePageName()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [isOrderSidebarVisible, setIsOrderSidebarVisible] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        document.title = "Point of Sale | asceflow.ai"
        setActivePageName("Point of Sale")

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768) // 768px is typically used for tablet breakpoint
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile) {
            setIsOrderSidebarVisible(false)
        } else {
            setIsOrderSidebarVisible(true)
        }
    }, [isMobile])

    const handleSearch = (term: string) => {
        setSearchTerm(term)
    }

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category)
    }

    const handleAddToOrder = (product: Product) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevItems, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
            }
        })
        if (isMobile) {
            setIsOrderSidebarVisible(true)
        }
    }

    const handleUpdateQuantity = (id: string, change: number) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter((item) => item.quantity > 0)
        )
    }

    const handleRemoveItem = (id: string) => {
        setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const toggleOrderSidebar = () => {
        setIsOrderSidebarVisible(!isOrderSidebarVisible)
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
                onClose={isMobile ? toggleOrderSidebar : undefined}
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