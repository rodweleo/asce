'use client'

import { useState } from 'react'
import { Progress } from './progress'
import { Button } from './button'
import { toast } from 'react-hot-toast'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import BusinessOnboardingBusinessInfo from './business-onboarding-business-info'
import BusinessOnboardingOwnerInfo from './business-onboarding-owner-info'
import BusinessOnboardingLocationInfo from './business-onboarding-location-info'

const formSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessLogo: z.any().optional(),
    description: z.string().max(250, "Description must be 250 characters or less"),
    contactPhone: z.string().min(1, "Contact phone is required"),
    contactEmail: z.string().email("Invalid email address"),
    ownerName: z.string().min(1, "Owner name is required"),
    ownerEmail: z.string().email("Invalid email address"),
    ownerPhone: z.string().min(1, "Owner phone is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    socialMedia: z.object({
        instagram: z.string().optional(),
        tiktok: z.string().optional(),
        youtube: z.string().optional(),
        whatsapp: z.string().optional(),
    }),
    additionalNotes: z.string().optional(),
})

export default function BusinessOnboardingForm() {
    const [step, setStep] = useState(1)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessLogo: null,
            description: "",
            contactPhone: "",
            contactEmail: "",
            ownerName: "",
            ownerEmail: "",
            ownerPhone: "",
            country: "",
            city: "",
            socialMedia: {
                instagram: "",
                tiktok: "",
                youtube: "",
                whatsapp: "",
            },
            additionalNotes: "",
        },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data) => {
        console.log(data)

        toast.success(`Hello ${data.businessName}, your business has been successfully registered!`)
    }

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <Progress value={(100 - (100 / step))} />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                    {step === 1 && (
                        <BusinessOnboardingBusinessInfo form={form} />
                    )}
                    {step === 2 && (
                        <BusinessOnboardingOwnerInfo form={form} />
                    )}
                    {step === 3 && (
                        <BusinessOnboardingLocationInfo form={form} />
                    )}
                    <div className="mt-6 flex justify-between">
                        {step > 1 && (
                            <Button type="button" onClick={prevStep} variant="outline">
                                Previous
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button type="button" onClick={nextStep} className="ml-auto">
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" className="ml-auto">
                                Complete Onboarding
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}

