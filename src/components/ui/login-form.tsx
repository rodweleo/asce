"use client"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import SignInWithIcpAuthenticatorBtn from "./sign-in-with-icp-authenticator-btn"
import SignInWithPlugWalletBtn from "./sign-in-with-plug-wallet-btn"
import SignInWithNfidBtn from "./sign-in-with-nfid-btn"
import SignInWithBitcoinBtn from "./sign-in-with-bitcoin-btn"


export default function LoginForm() {


    return (
        <Card className="w-full max-w-md h-fit">
            <CardHeader>
                <CardTitle>Log in or sign up in seconds</CardTitle>
                <CardDescription>Use your email or another service to continue with Asceflow (it’s free)!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <SignInWithIcpAuthenticatorBtn />
                    <SignInWithPlugWalletBtn />
                    <SignInWithBitcoinBtn />
                    <SignInWithNfidBtn />
                </div>
            </CardContent>
            <CardFooter>
                <p>By continuing, you agree to Asceflow’s Terms of Use. Read our Privacy Policy.</p>
            </CardFooter>
        </Card>
    )
}