"use client"

import Link from "next/link";
import { Button } from "./button";
import { useIsMobile } from "@/hooks/use-mobile";
import { RootMobileNav } from "./root-mobile-nav";
import Image from "next/image"

export default function RootHeader() {
    const isMobile = useIsMobile()

    return (
        <header className="fixed top-0 z-50 h-20 w-full border-b bg-transparent backdrop-blur">
            <div className="container flex justify-between h-full items-center">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                    <Image src="/logos/Asceflow Logo.png" alt="Asceflow.ai" width={50} height={25} />
                    <span className="font-bold sm:inline-block text-primary">asceflow.ai</span>
                </Link>
                {isMobile ? <RootMobileNav /> : <>
                    <nav className="flex items-center space-x-8 text-sm font-medium">
                        <Link href="#features">Features</Link>
                        <Link href="#pricing">Pricing</Link>
                        <Link href="#testimonials">Testimonials</Link>
                        <Link href="#contact">Contact</Link>
                    </nav>

                    <div className="items-center justify-between gap-5 space-x-5">
                        <Button variant="ghost" asChild>
                            <Link href="/login" target="_blank">Log in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/onboarding">Start Free Trial</Link>
                        </Button>

                    </div>
                </>}
            </div>
        </header>
    )
}