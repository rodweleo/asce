"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar"
import { LogOut, BarChart3, Box, DollarSign, FileText, Home, MessageCircle, Settings, Truck, Users, ChevronDown } from "lucide-react"
import { Button } from "./button"
import { useState } from "react"
import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { useRouter } from "next/router"

export default function AdminSidebar() {

    const [activeTab, setActiveTab] = useState("overview")
    const router = useRouter()
    const sidebarItems = [
        { icon: Home, label: "Overview", value: "/account/admin" },
        { icon: Box, label: "Inventory", value: "/account/admin/inventory" },
        { icon: Box, label: "Orders", value: "/account/admin/orders" },
        { icon: Truck, label: "Suppliers", value: "/account/admin/suppliers" },
        { icon: FileText, label: "Invoices", value: "/account/admin/invoices" },
        { icon: DollarSign, label: "Payments", value: "/account/admin/payments" },
        { icon: MessageCircle, label: "Customer Engagement", value: "/account/admin/engagement" },
        {
            icon: Users,
            label: "Digital Marketing",
            value: "/account/admin/digital-marketing",
            sub_items: [
                { icon: MessageCircle, label: "Overview", value: "/account/admin/digital-marketing/overview" },
                { icon: MessageCircle, label: "Content Upload", value: "/account/admin/digital-marketing/content-upload" },
                { icon: MessageCircle, label: "Campaign Management", value: "/account/admin/digital-marketing/campaign-management" },
                { icon: MessageCircle, label: "Engagement Metrics", value: "/account/admin/digital-marketing/engagement-metrics" },
                { icon: MessageCircle, label: "Platform integration", value: "/account/admin/digital-marketing/platform-integration" },
            ]
        },
        { icon: BarChart3, label: "Reports", value: "/account/admin/reports" },
        { icon: Settings, label: "Settings", value: "/account/admin/settings" },
    ]

    const logOut = () => {
        router.replace("/")
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <span className="text-lg font-bold">BizPro</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2.5">
                            {sidebarItems.map((item) => (
                                item.sub_items
                                    ?
                                    <Collapsible key={item.value} className="group/collapsible w-full">
                                        <SidebarGroup>
                                            <SidebarGroupLabel asChild>
                                                <CollapsibleTrigger className="px-0" asChild>
                                                    <SidebarMenuItem key={item.value} className="w-full">
                                                        <SidebarMenuButton
                                                            className="flex items-center justify-start w-full">
                                                            <div className="flex items-center gap-2.5">
                                                                <item.icon className="h-4 w-4" />
                                                                {item.label}
                                                            </div>
                                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </CollapsibleTrigger>
                                            </SidebarGroupLabel>
                                            <CollapsibleContent>
                                                <SidebarGroupContent>
                                                    <SidebarMenu className="space-y-2.5 mt-2.5">
                                                        {
                                                            item.sub_items.map((sub_item) => (
                                                                <SidebarMenuItem key={sub_item.value}>
                                                                    <SidebarMenuButton asChild
                                                                        onClick={() => setActiveTab(sub_item.value)}
                                                                        isActive={activeTab === sub_item.value}

                                                                    >
                                                                        <Link href={sub_item.value} className="flex items-center space-y-2.5 gap-2.5">
                                                                            <item.icon className="h-4 w-4" />
                                                                            {sub_item.label}
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            ))
                                                        }
                                                    </SidebarMenu>
                                                </SidebarGroupContent>
                                            </CollapsibleContent>
                                        </SidebarGroup>
                                    </Collapsible>
                                    :
                                    <SidebarMenuItem key={item.value}>
                                        <SidebarMenuButton
                                            onClick={() => setActiveTab(item.value)}
                                            isActive={activeTab === item.value}
                                            className="p-4"
                                        >
                                            <Link href={item.value} className="flex items-center space-y-2.5 gap-2.5">
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <div className="mt-auto p-4">
                <Button onClick={logOut} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </div>
        </Sidebar>
    )
}