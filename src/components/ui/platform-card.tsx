import { Card, CardHeader, CardTitle, CardContent } from "./card";

export default function PlatformCard({ icon, name, stats }) {
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