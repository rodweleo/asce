"use client"

import LoginForm from "./login-form";
import {
    Dialog,
    DialogContent,
} from "./dialog"
import useLoginModal from "@/hooks/use-login-modal";

export default function LoginModal() {
    const { isOpen, setOpen } = useLoginModal()

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
            <DialogContent className="p-0 w-fit">
                <LoginForm />
            </DialogContent>
        </Dialog>

    )
}