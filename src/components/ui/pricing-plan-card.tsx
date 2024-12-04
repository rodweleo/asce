"use client"

import { CheckCircle } from "lucide-react";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { Badge } from "./badge";
import { IconSparkles } from "@tabler/icons-react";
import { requestPlugWalletTransfer } from "@/functions/requestPlugWalletTransfer";

interface PricingPlanProps {
    name: string
    description: string
    price: number
    features: string[]
    icon?: ReactNode
    recommended: boolean
}

export default function PricingPlanCard({ name, description, price, features, icon, recommended }: PricingPlanProps) {

    const plan = {
        name: name,
        description: description,
        price: price,
        features: features,
        icon: icon,
        recommended: recommended
    }

    return (
        <>
            {recommended ? <RecommendedPricingPlanCard {...plan} /> : <NormalPricingPlanCard {...plan} />}
        </>
    )
}

const RecommendedPricingPlanCard = ({ name, description, price, features, icon }: PricingPlanProps) => {

    const router = useRouter()

    const navigateToOnboardingPage = () => {
        const redirectUrl = `/onboarding?plan=${name.toLowerCase().replaceAll(" ", "-")}`
        router.push(redirectUrl)
    }

    const subscribeToPlan = async () => {
        await requestPlugWalletTransfer("ABCD", price);
    }


    return (
        <Card key={name} className="w-full sm:w-[300px] bg-blue-500 scale-[1.10]">
            <CardHeader className="tracking-wide">
                <CardTitle className="tracking-wide">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="bg-white w-fit p-2 text-blue-500 rounded-full">
                                {icon}
                            </div>
                            <Badge className="bg-orange-100 text-orange-500 tracking-wider flex items-center gap-2 w-fit hover:bg-orange-200"><IconSparkles /> RECOMMENDED</Badge>
                        </div>
                        <span className="text-white">{name}</span>
                    </div>
                </CardTitle>
                <CardDescription className="text-neutral-100">{description}</CardDescription>
                <CardTitle className="py-2 text-2xl sm:text-4xl text-white">{price.toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                })}<span className="text-sm tracking-loose"> / month</span></CardTitle>

            </CardHeader>
            <CardContent>
                <div className="text-white space-y-2.5 tracking-wide">
                    <h2 className="font-semibold">Features:</h2>
                    <ul className="space-y-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center ">
                                <CheckCircle className="mr-2 h-4 w-4 " />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-white text-blue-500 font-bold tracking-wide hover:border-2 hover-border-white hover:text-white hover:bg-transparent" onClick={subscribeToPlan}>
                    SUBSCRIBE
                </Button>
            </CardFooter>
        </Card >
    )
}

const NormalPricingPlanCard = ({ name, description, price, features, icon }: PricingPlanProps) => {

    const router = useRouter()

    const navigateToOnboardingPage = () => {
        const redirectUrl = `/onboarding?plan=${name.toLowerCase().replaceAll(" ", "-")}`
        router.push(redirectUrl)
    }

    const subscribeToPlan = async () => {
        await requestPlugWalletTransfer("ABCD", price);
    }

    return (
        <Card key={name} className="w-full sm:w-[300px] ">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-col gap-2">
                        <div className="bg-blue-500 w-fit p-2 text-white rounded-full">
                            {icon}
                        </div>
                        <span>{name}</span>
                    </div>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="py-2 text-2xl sm:text-4xl">{price.toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                })}<span className="text-sm tracking-loose"> / month</span></CardTitle>

            </CardHeader>
            <CardContent>
                <div className="space-y-2.5 tracking-wide">
                    <h2 className="font-semibold">Features:</h2>
                    <ul className="space-y-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center ">
                                <CheckCircle className="mr-2 h-4 w-4 " />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={subscribeToPlan}>
                    SUBSCRIBE
                </Button>
            </CardFooter>
        </Card >
    )
}

