"use client"


import { ChevronRight } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils";
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import { Button } from './button';
import Image from "next/image"
import { BorderBeam } from './border-beam';

export default function HeroSection() {
    return (
        <section className="w-full py-12 md:py-4 lg:py-4 xl:py-16 min-h-screen mt-20 grid place-items-center">
            <div className="container px-4 md:px-6 space-y-10">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-4 grid place-items-center">
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
                        <h1 className="tracking-wide text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-winde">
                            Streamline Your Business Operations
                        </h1>
                        <p className="w-full max-w-4xl text-neutral-500 sm:text-md md:text-lg lg:text-xl dark:text-neutral-800">
                            End-to-end business management from automated inventory management to social media management in a single solution. <br /> Meet <span className="text-blue-500 font-bold">asceflow.ai</span>, the right platform to help you realize your business goals.
                        </p>
                    </div>
                    <div className="tracking-wide flex flex-wrap gap-5 items-center justify-center *:px-10">
                        <Button asChild>
                            <Link href="/onboarding">Get Started</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="#features">
                                Learn More <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="w-full relative rounded-md">
                    <Image src="/logos/hero demo dashboard.png" alt="asceflow.ai demo dashboard" width={1920}
                        height={1080}
                        className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md border" />
                    <BorderBeam />
                    <div className="absolute z-40 inset-0 bg-gradient-to-t from-white to-transparent border-b-md" />
                </div>
            </div>
        </section>

    )
}