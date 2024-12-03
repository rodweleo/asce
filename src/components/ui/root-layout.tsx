"use client"

import { ReactNode } from "react";
import RootFooter from "./root-footer";
import RootHeader from "./root-header"
import { AuroraBackground } from './aurora-background';

interface RootLayoutProps {
    children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <AuroraBackground className="overflow-x-hidden">
            <RootHeader />
            {children}
            <RootFooter />
        </AuroraBackground>
    )
}