import Link from "next/link";

export default function RootFooter(){
    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full border-t h-14">
            <div className="container flex h-full items-center justify-between gap-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {currentYear} BizPro. All rights reserved.
                </p>
                <nav className="flex items-center space-x-4 text-sm font-medium">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/contact">Contact Us</Link>
                </nav>
            </div>
        </footer>
    )
}