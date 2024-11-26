import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet"
import Link from "next/link"
import { Button } from "./button"

export function RootMobileNav() {

    
    return (
        <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent className="bg-white h-full">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-blue-500">asceflow.ai</SheetTitle>
                    <SheetDescription>
                        Streamline your Business with asceflow.ai
                    </SheetDescription>
                </SheetHeader>
                <div className="h-full">
                    <div className="mt-5 w-full h-full flex flex-col justify-between">
                        <ul className="flex flex-col gap-5">
                            <li><Link href="#features">Features</Link></li>
                            <li><Link href="#pricing">Pricing</Link></li>
                            <li><Link href="#testimonials">Testimonials</Link></li>
                        </ul>

                        <ul className="flex flex-col list-none w-full mb-28 gap-5">
                            <li className="w-full"><Button variant="outline" className="w-full">
                                <Link href="/login" target="_blank" >Log in</Link>
                            </Button></li>
                            <li className="w-full">
                                <Button className="w-full">
                                    <Link href="/onboarding">Start Free Trial</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>

    )
}