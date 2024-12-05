"use client";
import React from "react";
import useChatbotModal from "@/hooks/use-chatbot-modal";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./dialog";
import { IconBrandHipchat } from "@tabler/icons-react";
import { Chatbot } from "./chatbot";
import Link from "next/link"

export function ChatbotModal() {
    const { isOpen, setOpen } = useChatbotModal()

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
        <button onClick={() => setOpen(true)} title="Asceflow Business Assitant" className="fixed right-10 bottom-2 z-40 animate-pulse"><IconBrandHipchat size={50} /></button>
    )
}
