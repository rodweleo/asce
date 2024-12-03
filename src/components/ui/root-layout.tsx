"use client"

import { ReactNode } from "react";
import RootFooter from "./root-footer";
import RootHeader from "./root-header"

interface RootLayoutProps {
    children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <RootHeader />
            {children}
            <RootFooter />
        </>
    )
}