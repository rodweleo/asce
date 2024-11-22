import AdminLayout from "../../../../../components/ui/admin-layout"
import React from "react"

import { PlusCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import AdminDigitalMarketingCampaignList from "../../../../../components/ui/admin-digital-marketing-campaign-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../../components/ui/card";

export default function AdminDigitalMarketingCampaignManagement() {
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Campaign Management</CardTitle>
                    <CardDescription>Create and manage your social media campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="mb-4">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Campaign
                    </Button>
                    <div className="overflow-x-auto">
                        <AdminDigitalMarketingCampaignList />
                    </div>
                </CardContent>
            </Card></div>
    )
}

AdminDigitalMarketingCampaignManagement.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
}