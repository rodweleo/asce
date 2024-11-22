import { Switch } from "./switch";
import { Label } from "./label";
import { Badge } from "./badge";
import PricingPlanCard from "./pricing-plan-card";

export default function PricingPlans() {

    const plans = [
        { name: "Free Trial", description: "A free plan for individuals and businesses.", price: 0, features: ["14-day trial", "Basic features", "Limited support"] },
        { name: "Basic", description: "A basic plan for individuals, startups and businesses", price: 10, features: ["Full feature access", "Priority support", "Up to 1000 products"] },
        { name: "Premium", description: "A premium plan for growing businesses and organizations", price: 20, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
        { name: "Enterprise", description: "An enterprise plan with advanced features for large organizations", price: 50, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
        { name: "Ultimate", description: "The ultimate plan with all features for industry leaders", price: 80, features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
    ]
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="px-4 md:px-6 space-y-5 grid place-items-center">
                <div className="grid place-items-center gap-5">
                    <div className="text-center space-y-2">
                        <h2 className="font-semibold text-2xl sm:text-2xl">Pricing</h2>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-loose">Simple pricing for everyone.</h1>
                        <p className="font-medium sm:text-xl text-slate-600">Choose an <strong>affordable plan</strong> that&apos;s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2.5">
                            <Switch />
                            <Label className="font-medium text-lg">Annual</Label>
                        </div>
                        <Badge>1 MONTH FREE</Badge>
                    </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-fit gap-5">
                    {plans.map((plan, index) => (
                        <li key={plan.name} className={`${index === 2 && "border-2 border-yellow-400 rounded-lg"}`}>
                            <PricingPlanCard name={plan.name} description={plan.description} features={plan.features} price={plan.price} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}