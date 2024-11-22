import { CheckCircle } from "lucide-react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Separator } from "./separator";

interface PricingPlanProps {
    name: string
    description: string
    price: number
    features: string[]
}
export default function PricingPlanCard({ name, description, price, features }: PricingPlanProps) {
    return (
        <Card key={name} className="w-full sm:w-[300px]">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="py-4">{price.toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                })}<span className="text-sm tracking-loose"> / month</span></CardTitle>
                <Button className="w-full">
                    SUBSCRIBE
                </Button>
            </CardHeader>
            <Separator className="border-[1px] border-dotted border-slate-300" />
            <CardContent>
                <ul className="space-y-2 mt-5">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}