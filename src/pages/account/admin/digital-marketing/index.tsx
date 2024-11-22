"use client"

import { ReactElement, useState } from 'react'
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Upload, BarChart2, MessageSquare } from 'lucide-react'
import AdminLayout from '../../../../components/ui/admin-layout'

export default function AdminDigitalMarketing() {
    const [videoTitle, setVideoTitle] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

    const handleUploadVideo = () => {

    }

    const handleGenerateAd = () => {

    }

    const handlePostAd = () => {

    }

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        )
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6">Social Media Management</h1>
            <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload">Upload Content</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="ads">Ads Management</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Video</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    placeholder="Video Title"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                />
                                <Input
                                    placeholder="Video Description"
                                    value={videoDescription}
                                    onChange={(e) => setVideoDescription(e.target.value)}
                                />
                                <div>
                                    <p className="mb-2">Select Platforms:</p>
                                    <div className="flex space-x-2">
                                        {['YouTube', 'TikTok', 'Instagram'].map(platform => (
                                            <Button
                                                key={platform}
                                                variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                                                onClick={() => togglePlatform(platform)}
                                            >
                                                {platform}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Button onClick={handleUploadVideo}>
                                    <Upload className="mr-2 h-4 w-4" /> Upload Video
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Views</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <BarChart2 className="h-24 w-24 mx-auto" />
                                        <p className="text-center mt-2">10,000</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Likes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <BarChart2 className="h-24 w-24 mx-auto" />
                                        <p className="text-center mt-2">5,000</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Comments</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <BarChart2 className="h-24 w-24 mx-auto" />
                                        <p className="text-center mt-2">500</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ads">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ads Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Button onClick={handleGenerateAd}>
                                    <MessageSquare className="mr-2 h-4 w-4" /> Generate AI Ad
                                </Button>
                                <div>
                                    <p className="mb-2">Select Platforms for Ad:</p>
                                    <div className="flex space-x-2">
                                        {['Facebook', 'Instagram', 'Twitter'].map(platform => (
                                            <Button
                                                key={platform}
                                                variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                                                onClick={() => togglePlatform(platform)}
                                            >
                                                {platform}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Button onClick={handlePostAd}>
                                    <Upload className="mr-2 h-4 w-4" /> Post Ad
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

AdminDigitalMarketing.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
};