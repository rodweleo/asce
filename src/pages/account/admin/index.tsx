"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../../components/ui/card";
import { DollarSign, Users, BarChart3 } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, Bar, BarChart, } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../components/ui/chart"
import { ReactElement, useEffect } from "react";
import AdminLayout from "../../../components/ui/admin-layout";
import useMerchantProductsQuery from "@/hooks/use-merchant-products";
import useMerchantSalesQuery from "@/hooks/use-merchant-sales";
import useMerchantSuppliersQuery from "@/hooks/user-merchant-suppliers";

export default function AdminDashboard() {

    useEffect(() => {
        document.title = "Dashboard | asceflow.ai"
    }, [])

    const { products } = useMerchantProductsQuery();
    const { sales } = useMerchantSalesQuery();
    const { suppliers } = useMerchantSuppliersQuery();

    const RECENT_SALES = [
        { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
    ]

    const OVERVIEW = [
        { name: "January", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "February", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "March", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "April", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "June", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "July", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "August", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "September", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "October", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "November", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "December", total: Math.floor(Math.random() * 5000) + 1000 },
    ]

    const chartConfig = {
        total: {
            label: "Total Sales: ",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig



    return (
        <div className="flex-1 overflow-auto">
            <main>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${sales.reduce((sum, ele) => {
                                return sum + Number(ele.totalAmount)
                            }, 0)}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Products</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{products.length}</div>
                            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales / Orders</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{sales.length}</div>
                            <p className="text-xs text-muted-foreground">+19% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{suppliers.length}</div>
                            <p className="text-xs text-muted-foreground">+201 since last hour</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ChartContainer config={chartConfig}>
                                <BarChart accessibilityLayer data={RECENT_SALES}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="hsl(var(--chart-1))"
                                        radius={8}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>You made {sales.length} sales this month.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <LineChart
                                    accessibilityLayer
                                    data={OVERVIEW}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Line
                                        dataKey="total"
                                        type="monotone"
                                        stroke="hsl(var(--chart-1))"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};