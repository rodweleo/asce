import { Button } from "./button";
import Image from "next/image"
import { useAuth } from "./use-auth-client";
import { Loader } from "./loader";


export default function SignInWithPlugWalletBtn() {

    const { signInWithPlugWallet, isAuthenticating } = useAuth()

    return (
        <Button type="button" onClick={signInWithPlugWallet} disabled={isAuthenticating} className="w-full flex items-center justify-center" variant="outline">
            <Image src="/logos/Plug Wallet Logo.png" alt="Plug Wallet" width={20} height={25} />
            <div className="font-semibold flex items-center gap-2.5"> {isAuthenticating && <Loader />} SIGN IN WITH PLUG WALLET</div>
        </Button>
    )
}