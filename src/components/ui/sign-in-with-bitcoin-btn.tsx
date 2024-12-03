
import { Button } from "./button";
import Image from "next/image"
import { useAuth } from "./use-auth-client";
import { Loader } from "./loader";


export default function SignInWithBitcoinBtn() {

    const { signInWithNfid, isAuthenticating } = useAuth()

    return (
        <Button type="button" onClick={signInWithNfid} disabled={isAuthenticating} className="w-full flex items-center justify-center" variant="outline">
            <Image src="/logos/btc.svg" alt="Bitcoin" width={20} height={25} />
            <div className="font-semibold flex items-center gap-2.5"> {isAuthenticating && <Loader />} CONTINUE WITH BITCOIN</div>
        </Button>
    )
}