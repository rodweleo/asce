
"use client"

import { useEffect } from "react"
import LoginForm from "../../components/ui/login-form";
export default function LoginPage() {

    useEffect(() => {
        document.title = "Login | asceflow.ai"
    }, [])


    return (
        <div className="h-screen w-full xl:flex">
            <div className="xl:hidden text-center bg-blue-950 text-center text-white space-y-4 w-full py-4 font-bold rounded-lg">
                <h2 className="text-xl">Welcome to</h2>
                <h1 className="text-7xl w-full px-8 rounded-xl tracking-wider font-bold">asceflow.ai</h1>
            </div>
            <section className="xl:w-2/4 sm:w-full h-full grid place-items-center p-2.5">
                <div className="grid place-items-center gap-5">
                    <LoginForm />
                </div>
            </section>
            <div className="hidden w-2/4 h-full bg-blue-950 xl:grid place-items-center">
                <div className="text-center flex flex-col items-center space-y-5 p-2.5 select-none">
                    <h1 className="text-8xl bg-white text-blue-950 w-fit px-8 rounded-xl tracking-wider font-bold">asceflow.ai</h1>
                    <p className="text-slate-300">Automate inventory, simplify supplier coordination, and boost customer engagement with our AI-powered platform.</p>
                </div>
            </div>
        </div>
    )
}
