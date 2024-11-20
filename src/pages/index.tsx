"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, CheckCircle, Star } from 'lucide-react'
import Link from "next/link"
import { FEATURES } from "@/utils/data";
import { useEffect, ReactElement } from "react";
import RootLayout from "@/components/ui/root-layout";


export default function RootLandingPage() {

  useEffect(() => {
    document.title = "Home | BizPro"
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main >
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your Business with BizPro
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Automate inventory, simplify supplier coordination, and boost customer engagement with our AI-powered platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 light:bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
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
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "John Doe", company: "Tech Solutions Inc.", quote: "FlowSync AI has revolutionized our inventory management. We've reduced stockouts by 50%!" },
                { name: "Jane Smith", company: "Retail Giants", quote: "The customer engagement features have significantly improved our response times and satisfaction rates." },
                { name: "Mike Johnson", company: "Supply Chain Pro", quote: "Coordinating with suppliers has never been easier. FlowSync AI is a game-changer for our business." },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{testimonial.quote}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Free Trial", price: "$0", features: ["14-day trial", "Basic features", "Limited support"] },
                { name: "Basic", price: "$49/month", features: ["Full feature access", "Priority support", "Up to 1000 products"] },
                { name: "Premium", price: "$99/month", features: ["Advanced analytics", "Dedicated account manager", "Unlimited products"] },
              ].map((plan, index) => (
                <Card key={index} className={index === 1 ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}

RootLandingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>{page}</RootLayout>
  )
};
