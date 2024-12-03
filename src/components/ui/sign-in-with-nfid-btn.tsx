
import { Button } from "./button";
import Image from "next/image"
import { useAuth } from "./use-auth-client";
import { Loader } from "./loader";


export default function SignInWithNfidBtn() {

    const { signInWithNfid, isAuthenticating } = useAuth()

    return (
        <Button type="button" onClick={signInWithNfid} disabled={isAuthenticating} className="w-full flex items-center justify-center" variant="outline">
            <Image src="/logos/nfid.svg" alt="NFID" width={25} height={25} />
            <div className="font-semibold flex items-center gap-2.5"> {isAuthenticating && <Loader />} SIGN IN WITH NFID</div>
        </Button>
    )
}