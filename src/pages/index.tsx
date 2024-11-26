"use client"


import { cn } from "../lib/utils";
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ChevronRight, Star } from 'lucide-react'
import Link from "next/link"
import { FEATURES } from "../utils/data";
import { useEffect, ReactElement } from "react";
import RootLayout from "../components/ui/root-layout";
import PricingPlans from "../components/ui/pricing-plans";
import AnimatedGradientText from "../components/magicui/animated-gradient-text";


export default function RootLandingPage() {

  useEffect(() => {
    document.title = "Home | asceflow.ai"
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main >
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <AnimatedGradientText>
                    🎉 <hr className="mx-2 w-px shrink-0 bg-gray-300" />{" "}
                    <span
                      className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                      )}
                    >
                      Introducing asceflow.ai
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedGradientText>
                </div>
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-winde">
                  Streamline Your Business with <span className="text-primary">asceflow.ai</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 sm:text-lg md:text-xl lg:text-2xl dark:text-gray-400">
                  Automate inventory, simplify supplier coordination, and boost customer engagement with our AI-powered platform.
                </p>
              </div>
              <div className="flex flex-wrap gap-5 items-center justify-center *:px-10">
                <Button asChild>
                  <Link href="/onboarding">Start Free Trial</Link>
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
                { name: "John Doe", company: "Tech Solutions Inc.", quote: "asceflow.ai has revolutionized our inventory management. We've reduced stockouts by 50%!" },
                { name: "Jane Smith", company: "Retail Giants", quote: "The customer engagement features have significantly improved our response times and satisfaction rates." },
                { name: "Mike Johnson", company: "Supply Chain Pro", quote: "Coordinating with suppliers has never been easier. asceflow.ai is a game-changer for our business." },
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
        <PricingPlans />
      </main>

    </div>
  )
}

RootLandingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>{page}</RootLayout>
  )
};
