"use client"

import { ReactNode } from "react";
import RootFooter from "./root-footer";
import RootHeader from "./root-header"
import { ThemeProvider } from "./theme-provider"

interface RootLayoutProps{
    children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <RootHeader />
            {children}
            <RootFooter />
        </ThemeProvider>
    )
}