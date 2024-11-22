
"use client"

import { useEffect } from "react"
import LoginForm from "../../components/ui/login-form";
export default function LoginPage() {

    useEffect(() => {
        document.title = "Login | BizPro"
    }, [])


    return (
        <div className="h-screen w-full flex">
            <section className="w-2/4 h-full grid place-items-center p-2.5">
                <LoginForm />
            </section>
            <div className="w-2/4 h-full bg-blue-950 grid place-items-center">
                <div className="text-center flex flex-col items-center space-y-5 p-2.5 select-none">
                    <h1 className="text-8xl bg-white text-blue-950 w-fit px-8 rounded-xl">Bizpro</h1>
                    <p className="text-slate-300">Automate inventory, simplify supplier coordination, and boost customer engagement with our AI-powered platform.</p>
                </div>

            </div>
        </div>
    )
}
