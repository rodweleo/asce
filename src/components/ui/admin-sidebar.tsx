"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar"
import { Box, FileText, Home, MessageCircle, Truck, Users, ChevronDown, LayoutDashboard, ImageUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"
import { useAuth } from "./use-auth-client"

export default function AdminSidebar() {

    const [activeTab, setActiveTab] = useState("overview")

    const { whoAmI } = useAuth()

    const sidebarItems = [
        { icon: Home, label: "Overview", value: "/account/admin" },
        { icon: Box, label: "Point of Sale", value: "/account/admin/pos" },
        { icon: Box, label: "Inventory", value: "/account/admin/inventory" },
        { icon: Box, label: "Orders", value: "/account/admin/orders" },
        { icon: Truck, label: "Suppliers", value: "/account/admin/suppliers" },
        { icon: FileText, label: "Invoices", value: "/account/admin/invoices" },
        {
            icon: Users,
            label: "Digital Marketing",
            value: "/account/admin/digital-marketing",
            sub_items: [
                { icon: LayoutDashboard, label: "Overview", value: "/account/admin/digital-marketing/overview" },
                { icon: ImageUp, label: "Content Upload", value: "/account/admin/digital-marketing/content-upload" },
                { icon: MessageCircle, label: "Campaign Management", value: "/account/admin/digital-marketing/campaign-management" },
                // { icon: MessageCircle, label: "Engagement Metrics", value: "/account/admin/digital-marketing/engagement-metrics" },
                // { icon: MessageCircle, label: "Platform integration", value: "/account/admin/digital-marketing/platform-integration" },
            ]
        }
    ]


    return (
        <Sidebar className="bg-white">
            <SidebarHeader>
                <h1 className="text-xl font-bold text-blue-500">{whoAmI}</h1>
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
                                                                            <sub_item.icon className="h-4 w-4" />
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
                                            <Link href={item.value} className={`flex items-center space-y-2.5 gap-2.5 `}>
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
        </Sidebar>
    )
}