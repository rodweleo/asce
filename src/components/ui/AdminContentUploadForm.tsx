import { Checkbox } from "./checkbox";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";

export default function AdminContentUploadForm(){
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upload Content</CardTitle>
                <CardDescription>Share your content across multiple platforms</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4 w-full">
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="picture">Upload Video or Image</Label>
                        <Input id="picture" type="file" />
                    </div>
                    <div className="space-y-2">
                        <Label>Select Platforms</Label>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="tiktok" />
                                <label htmlFor="tiktok">TikTok</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="instagram" />
                                <label htmlFor="instagram">Instagram</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="youtube" />
                                <label htmlFor="youtube">YouTube</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="caption">Caption</Label>
                        <Input id="caption" placeholder="Enter your caption here" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="hashtags">Hashtags</Label>
                        <Input id="hashtags" placeholder="#socialmedia #marketing" />
                    </div>
                    <div>
                        <Label>Schedule Post</Label>
                        <Calendar className="mt-2" />
                    </div>
                    <Button type="submit">Upload and Schedule</Button>
                </form>
            </CardContent>
        </Card>
    )
}

