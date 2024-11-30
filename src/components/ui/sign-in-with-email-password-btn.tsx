import { Mail } from "lucide-react";
import { Button } from "./button";
import Image from "next/image"


export default function SignInWithEmailPasswordBtn() {

    return (
        <Button type="button" className="w-full flex items-center justify-center" variant="outline">
            <Mail size={14} className="mb-[1px]" />
            <Image src="/logos/ICP Logo.svg" alt="ICP Authenticator" width={25} height={25} className="hidden" />
            <span className="font-semibold">SIGN IN WITH EMAIL AND PASSWORD</span>
        </Button>
    )
}