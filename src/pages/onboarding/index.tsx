"use client"

import BusinessOnboardingForm from "@/components/ui/business-onboarding-form";
import RootLayout from "@/components/ui/root-layout";
import { useEffect, ReactElement } from "react"

export default function BusinessOnboardingPage() {

    useEffect(() => {
        document.title = "Onboarding | asceflow.ai"
    }, [])

    return (
        <div className="w-full min-h-screen">
            <main className="container h-full mx-auto grid place-items-center">
                <BusinessOnboardingForm />
            </main>
        </div>
    )
}


BusinessOnboardingPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>{page}</RootLayout>
    )
};
