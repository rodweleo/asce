import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";


interface StatsProps {
    posts: number
    likes: string
    views: string
}
interface PlatformCardProps {
    icon: ReactNode
    name: string
    stats: StatsProps
}

export default function PlatformCard({ icon, name, stats }: PlatformCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    {icon}
                    <span className="ml-2">{name}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <div>Posts: {stats.posts}</div>
                    <div>Likes: {stats.likes}</div>
                    <div>Views: {stats.views}</div>
                </div>
            </CardContent>
        </Card>
    )
}