import Link from "next/link";
import { Separator } from "./separator";

export default function RootFooter() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="w-full border-t px-2 py-12 space-y-5">
            <section className="container grid sm:grid-cols-2 items-start justify-between">
                <div className="w-fit space-y-2">
                    <h1 className="text-4xl font-bold">bizpro</h1>
                    <p className="text-slate-600">Streamline Your Business with BizPro</p>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-10 w-fit">
                    <div className="space-y-4">
                        <h2 className="font-semibold">PRODUCT</h2>
                        <ul className="space-y-2 *:text-slate-600">
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/faq">Frequently Asked Questions</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-semibold">LEGAL</h2>
                        <ul className="space-y-2 *:text-slate-600">
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-semibold">REACH OUT</h2>
                        <ul className="space-y-2 *:text-slate-600">
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
            <Separator />
            <section className="container flex h-full items-center justify-between gap-4 w-full">
                <p className="text-center text-sm leading-loose text-muted-foreground w-full">
                    Copyright © {currentYear} BizPro. All rights reserved.
                </p>
            </section>
        </footer>
    )
}