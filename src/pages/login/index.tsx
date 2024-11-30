
"use client"

import { useEffect } from "react"
import LoginForm from "@/components/ui/login-form";
import AvatarCircles from "@/components/magicui/avatar-circles";

const avatars = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/16860528",
        profileUrl: "https://github.com/dillionverma",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/20110627",
        profileUrl: "https://github.com/tomonarifeehan",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/106103625",
        profileUrl: "https://github.com/BankkRoll",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59228569",
        profileUrl: "https://github.com/safethecode",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59442788",
        profileUrl: "https://github.com/sanjay-mali",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/89768406",
        profileUrl: "https://github.com/itsarghyadas",
    },
];

export default function LoginPage() {

    useEffect(() => {
        document.title = "Login | asceflow.ai"
    }, [])


    return (
        <div className="h-screen w-full xl:flex">

            <section className="xl:w-2/4 sm:w-full h-full grid place-items-center p-2.5">
                <div className="grid place-items-center gap-5">
                    <LoginForm />
                </div>
            </section>
            <div className="hidden w-2/4 h-full bg-blue-950 xl:grid place-items-center">
                <div className="text-center flex flex-col items-center space-y-5 p-2.5 select-none">
                    <h1 className="text-8xl bg-white text-blue-950 w-fit px-8 rounded-xl tracking-wider font-bold">asceflow.ai</h1>
                    <p className="text-slate-300">Automate inventory, simplify supplier coordination, and boost customer engagement with our AI-powered platform.</p>
                    <div>
                        <AvatarCircles numPeople={20} avatarUrls={avatars} />;
                        <p className="text-white">Trusted by 20+ businesses.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
