import Link from "next/link";
import { Button } from "./button";
import { ThemeModeToggle } from "./theme-mode-toggle";

export default function RootHeader(){
    return (
        <header className="sticky top-0 z-50 h-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex justify-between h-full items-center">
                <div className="flex items-center gap-5">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">BizPro</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="#features">Features</Link>
                        <Link href="#pricing">Pricing</Link>
                        <Link href="#testimonials">Testimonials</Link>
                    </nav>
                </div>
                <div className="items-center justify-between gap-5 space-x-5">
                    <Button variant="ghost" asChild>
                        <Link href="/login" target="_blank">Log in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/sign-up">Start Free Trial</Link>
                    </Button>
                    <ThemeModeToggle/>
                </div>
            </div>
        </header>
    )
}