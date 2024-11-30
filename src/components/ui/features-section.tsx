"use client"

import { FEATURES } from "@/utils/data";
import { Card, CardContent, CardHeader, CardTitle } from "./card"

export default function FeaturesSection() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 light:bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6 space-y-5">
                <div className="space-y-2 text-center w-full grid place-items-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Packed with Awesome Features</h2>
                    <p className="text-md text-slate-500 max-w-2xl">From Inventory Management to. Our AI can even create and manage your social media campaign through product & customer targeted image and video campaigns. </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))
                    }
                </div>
            </div>
        </section>
    )
}