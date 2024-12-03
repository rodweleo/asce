import { Switch } from "./switch";
import { Label } from "./label";
import { Badge } from "./badge";
import PricingPlanCard from "./pricing-plan-card";
import { IconBulb, IconDiamond, IconTrophy } from "@tabler/icons-react";

export default function PricingPlans() {

    const plans = [
        { name: "Free", description: "A free plan for individuals and businesses.", price: 0, features: ["14-day trial", "Basic features", "Limited support"], icon: <IconBulb />, recommended: false },
        { name: "Starter", description: "A start plan for individuals, startups and businesses", price: 7.65, features: ["Full feature access", "Priority support", "Up to 1000 products"], icon: <IconTrophy />, recommended: true },
        { name: "Premium", description: "A premium plan for growing businesses and organizations", price: 20, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"], icon: <IconDiamond />, recommended: false },
        // { name: "Enterprise", description: "An enterprise plan with advanced features for large organizations", price: 7.75, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
        // { name: "Ultimate", description: "The ultimate plan with all features for industry leaders", price: 10, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
    ]
    
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-800">
            <div className="px-4 md:px-6 space-y-10 grid place-items-center w-full">
                <div className="grid place-items-center gap-5">
                    <div className="text-center space-y-2">
                        <Badge className="font-semibold text-2xl sm:text-2xl px-8">Pricing</Badge>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-wide">Simple, Transparent Pricing for <span className="bg-blue-500 text-white px-4 rounded-md">Everyone</span></h1>
                        <p className="font-medium sm:text-xl text-neutral-500">Choose an <strong>affordable plan</strong> that&apos;s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2.5">
                            <Switch />
                            <Label className="font-medium text-lg">Annual</Label>
                        </div>
                        <Badge>1 MONTH FREE</Badge>
                    </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-2 lg:grid-cols-3 w-fit gap-10">
                    {plans.map((plan) => (
                        <li key={plan.name}>
                            <PricingPlanCard {...plan} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}