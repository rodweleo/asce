"use client"

// import { useRouter } from "next/navigation"
import { Button } from "./button"
import { Input } from "./input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form"
import toast from "react-hot-toast"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Label } from "./label"
import Link from "next/link"
import SignInWithIcpAuthenticatorBtn from "./sign-in-with-icp-authenticator-btn"
import SignInWithPlugWalletBtn from "./sign-in-with-plug-wallet-btn"
import SignInWithNfidBtn from "./sign-in-with-nfid-btn"
import SignInWithBitcoinBtn from "./sign-in-with-bitcoin-btn"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(10, {
        message: 'Password must be at least 10 characters.',
    }),

})
export default function LoginForm() {
    const [isSubmitting, setSubmitting] = useState(false)
    // const router = useRouter()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
        setSubmitting(true)

        const formData = new FormData()
        formData.set("email", values.email)
        formData.set("pass", values.password)


        toast.success(`Welcome back ${values.email}`)

        setSubmitting(false)


    }

    return (
        <Card className="w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} >
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            <div className="flex flex-col items-center gap-4">
                                <SignInWithIcpAuthenticatorBtn />
                                <SignInWithPlugWalletBtn />
                                <SignInWithBitcoinBtn />
                                <SignInWithNfidBtn />
                            </div>
                            <div className="flex items-center hidden">
                                <hr className="w-full" />
                                <span className="w-full text-xs text-slate-500 px-2.5">OR CONTINUE WITH</span>
                                <hr className="w-full" />
                            </div>
                            <div className="space-y-2.5 hidden">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="abc@example.com"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="********"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="remember" className="flex items-center gap-2 cursor-pointer">
                                        <Input id="remember" type="checkbox" className="w-4 h-4" />
                                        <span className="text-sm">Remember me</span>
                                    </Label>
                                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="hidden">
                        <div className="space-y-5 flex flex-col w-full">
                            <Button type="submit" disabled={isSubmitting} className="disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {
                                    isSubmitting ? <div className="flex items-center gap-2.5">
                                        <Loader2 className="animate-spin" />
                                        <span>Please Wait</span>
                                    </div> :
                                        <span>Login</span>
                                }
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}