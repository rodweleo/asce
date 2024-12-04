"use client";
import React from "react";
import useChatbotModal from "@/hooks/use-chatbot-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./dialog";
import { IconBrandHipchat } from "@tabler/icons-react";
import { Chatbot } from "./chatbot";
import Link from "next/link"

export function ChatbotModal() {
    const { isOpen, setOpen } = useChatbotModal()

    const images = [
        "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!isOpen) {
                    setOpen(open)
                } else {
                    setOpen(false)
                }
            }}
        >
            <DialogContent className="bg-white w-full ">
                <DialogHeader>
                    <DialogTitle>
                        Chat with <Link href="/" className="text-blue-500">asceflow.ai</Link>
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[500px]">
                    <Chatbot />
                </div>

            </DialogContent>
        </Dialog>
    );
}

export const ChatbotModalTrigger = () => {
    const { setOpen } = useChatbotModal()
    return (
        <button onClick={() => setOpen(true)} className="fixed right-10 bottom-10 z-40 animate-pulse"><IconBrandHipchat size={50} /></button>
    )
}
