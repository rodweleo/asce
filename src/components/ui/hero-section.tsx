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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6 space-y-10">
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