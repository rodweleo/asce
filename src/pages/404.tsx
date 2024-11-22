"use client"

import AdminLayout from "../components/ui/admin-layout"
import { Button } from "../components/ui/button"
import { useRouter } from "next/router"
import React from "react"

export default function NotFoundPage() {
    const router = useRouter()

    const navigateBack = () => {
        router.back()
    }
    return <div className="grid place-items-center w-full">
        <div className="text-center space-y-5">
            <h1 className="font-bold sm:text-6xl text-4xl">Oops! Page not Found.</h1>
            <p className="sm:text-2xl text-xl text-slate-500">We can&apos;t seem to find the page you&apos;re looking for.</p>

            <Button className="w-2/4 font-semibold" onClick={navigateBack}>GO BACK</Button>
        </div>
    </div>
}

NotFoundPage.getLayout = (page: React.ReactElement) => {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
}