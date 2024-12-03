"use client"


import Marquee from "../magicui/marquee";
import Image from "next/image"

export default function TrustedSmesSection() {

    const businesses = [
        {
            name: "Crafty Glity Furnitures",
            img: "/logos/Crafty Glity Logo.jpeg",
        },
        {
            name: "Jojawa Drops",
            img: "/logos/Crafty Glity Logo.jpeg",
        },
        {
            name: "Premium Car Wash",

            img: "/logos/Crafty Glity Logo.jpeg",
        },


    ];



    return (
        <section className="w-full space-y-4">
            <div className="text-center space-y-2">
                <h1 className="font-bold text-3xl sm:text-5xl">Trusted by the Best Performing SMEs </h1>
                <p className="text-slate-500"><span className="text-blue-500">asceflow.ai</span> is the choice of all the SMEs that mean BUSINESS!</p>
            </div>

            <div className="relative flex w-full flex-row items-center justify-center overflow-hidden">
                <Marquee pauseOnHover repeat={5} className="[--duration:20s] space-x-8">
                    {businesses.map((business) => (
                        <BusinessPartnershipCard key={business.name} name={business.name} img={business.img} />
                    ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-2/4 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-2/4 bg-gradient-to-l from-white dark:from-background"></div>
            </div>

        </section>
    )
}

const BusinessPartnershipCard = ({
    img,
    name,
}: {
    img: string;
    name: string;
}) => {
    return (
        <div className="flex flex-row items-center gap-2 select-none">
            <Image className="rounded-full" width={50} height={50} alt={name} src={img} />
            <span className="text-lg sm:text-2xl font-bold text-neutral-400 tracking-wider">{name}</span>
        </div>
    );
};