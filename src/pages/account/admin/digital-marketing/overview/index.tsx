"use client"

import AdminLayout from "@/components/ui/admin-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PlatformCard from "@/components/ui/platform-card";
import { Instagram, Youtube } from "lucide-react";
import { ReactElement, useEffect } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

export default function AdminDigitalMarketingOverview(){

    useEffect(() => {
        document.title = "Digital Marketing Overview | BizPro"
    }, [])
    const engagementData = [
        { name: 'Jan', TikTok: 4000, Instagram: 2400, YouTube: 2400 },
        { name: 'Feb', TikTok: 3000, Instagram: 1398, YouTube: 2210 },
        { name: 'Mar', TikTok: 2000, Instagram: 9800, YouTube: 2290 },
        { name: 'Apr', TikTok: 2780, Instagram: 3908, YouTube: 2000 },
        { name: 'May', TikTok: 1890, Instagram: 4800, YouTube: 2181 },
        { name: 'Jun', TikTok: 2390, Instagram: 3800, YouTube: 2500 },
        { name: 'Jul', TikTok: 3490, Instagram: 4300, YouTube: 2100 },
    ]

    return (
        <div className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PlatformCard
                    icon={<Instagram />}
                    name="TikTok"
                    stats={{ posts: 15, likes: '2.5K', views: '50K' }}
                />
                <PlatformCard
                    icon={<Instagram />}
                    name="Instagram"
                    stats={{ posts: 30, likes: '5K', views: '100K' }}
                />
                <PlatformCard
                    icon={<Youtube />}
                    name="YouTube"
                    stats={{ posts: 5, likes: '1K', views: '25K' }}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Overall Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="TikTok" fill="#000000" />
                            <Bar dataKey="Instagram" fill="#E1306C" />
                            <Bar dataKey="YouTube" fill="#FF0000" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

AdminDigitalMarketingOverview.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};