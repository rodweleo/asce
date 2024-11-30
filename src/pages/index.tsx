"use client"



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Star } from 'lucide-react'

import { useEffect, ReactElement } from "react";
import RootLayout from "../components/ui/root-layout";
import PricingPlans from "../components/ui/pricing-plans";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section"
import TrustedSmesSection from "@/components/ui/trusted-smes-section"

export default function RootLandingPage() {

  useEffect(() => {
    document.title = "Home | asceflow.ai"
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main >
        <HeroSection />
        <TrustedSmesSection />
        <FeaturesSection />

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
