"use client"

import { useState, ReactElement, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import RootLayout from "../../components/ui/root-layout"
import useLoginModal from "@/hooks/use-login-modal"
import toast from "react-hot-toast"
import AsceflowBackendActor from "@/utils/AsceflowBackendActor"
import { Business } from "@/declarations/bizpro-backend/bizpro-backend.did"

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false)
    const { setOpen } = useLoginModal()

    useEffect(() => {
        document.title = "Register Business | asceflow.ai"
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        try {

            const formData = new FormData(event.target);
            const businessName = formData.get("business_name") as string;
            const businessEmail = formData.get("business_email") as string;
            const businessIndustry = formData.get("business_industry") as string;

            const newBusiness: Business = {
                name: businessName || "",
                emailAddress: businessEmail || "",
                industry: businessIndustry || "",
            }

            const response = await AsceflowBackendActor.addorUpdateBusiness(newBusiness)

            toast.success(response)
        } catch (e) {
            toast.error(e.message())
        } finally {
            setIsLoading(false)
        }



    }

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 w-full">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Get started with asceflow.ai</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="business-name">Business Name</Label>
                            <Input id="business-name" name="business_name" placeholder="Enter your business name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="business-email">Business Email</Label>
                            <Input id="business-email" name="business_email" type="email" placeholder="Enter your business email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Business Industry</Label>
                            <Select required name="business_industry">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="retail">Retail</SelectItem>
                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                    <SelectItem value="services">Services</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <button className="text-blue-500 hover:underline" type="button" onClick={() => setOpen(true)}>
                                Log in
                            </button>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>{page}</RootLayout>
    )
};