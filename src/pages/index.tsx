"use client"

import { useEffect, ReactElement } from "react";
import RootLayout from "../components/ui/root-layout";
import PricingPlans from "../components/ui/pricing-plans";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section"
import TrustedSmesSection from "@/components/ui/trusted-smes-section"
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image"
import useLoginModal from "@/hooks/use-login-modal";

export default function RootLandingPage() {
  const loginModal = useLoginModal()

  useEffect(() => {
    document.title = "Home | asceflow.ai"
  }, [])

  const logos = [
    {
      name: "Microsoft",
      img: "https://picsum.photos/id/1/200/300",
    },
    {
      name: "Apple",
      img: "https://picsum.photos/id/2/200/300",
    },
    {
      name: "Google",
      img: "https://picsum.photos/id/3/200/300",
    },
    {
      name: "Facebook",
      img: "https://picsum.photos/id/4/200/300",
    },
    {
      name: "LinkedIn",
      img: "https://picsum.photos/id/5/200/300",
    },
    {
      name: "Twitter",
      img: "https://picsum.photos/id/6/200/300",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col w-full">
      <HeroSection />
      <TrustedSmesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingPlans />
      <section className="bg-gradient-to-br from-blue-800/10 to-transparent w-full py-14">
        <div className="container mx-auto flex justify-between sm:px-6 px-4 ">
          <div className="w-full max-w-4xl space-y-4">
            <h1 className="text-blue-800 sm:text-6xl tracking-wider font-bold">
              Ready to Supercharge Your Business Operations ?
            </h1>
            <Button onClick={() => loginModal.setOpen(true)}>Get Started</Button>
          </div>

          <div className="flex h-full flex-row gap-4 [perspective:800px] w-fit relative">
            <Marquee
              className="h-40 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {logos.map((data, idx) => (
                <Image
                  key={idx}
                  src={data.img}
                  alt={data.name}
                  width={25}
                  height={25}
                  className="mx-auto h-full w-[40px] cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                />
              ))}
            </Marquee>

            <Marquee
              className="h-40 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              reverse
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {logos.map((data, idx) => (
                <Image
                  key={idx}
                  src={data.img}
                  alt={data.name}
                  width={25}
                  height={25}
                  className="mx-auto h-full w-[40px] cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                />
              ))}
            </Marquee>

            <Marquee
              className="h-40 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
              vertical
              style={{
                transform:
                  "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
              }}
            >
              {logos.map((data, idx) => (
                <Image
                  key={idx}
                  src={data.img}
                  alt={data.name}
                  width={25}
                  height={25}
                  className="mx-auto h-full w-[40px] cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
                />
              ))}
            </Marquee>

          </div>

        </div>
      </section>
    </main>
  )
}

RootLandingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>{page}</RootLayout>
  )
};
