"use client"

import toast from "react-hot-toast";

export const requestPlugWalletTransfer = async (receiverAccountId: string, amount: number) => {

    const requestTransferArgs = {
        to: receiverAccountId,
        amount: amount,
    }

    if (typeof window !== "undefined") {

        const hasAllowed = await window.ic?.plug?.requestConnect();

        if (hasAllowed) {
            toast.success("Plug wallet connected!")

            try {
                await window.ic?.plug?.requestTransfer(requestTransferArgs);
            } catch (e) {
                toast.error(`Plug wallet failed to transfer: ${e.message}`)
            }

        } else {
            toast.error("Plug wallet connected was refused")
        }

    }
}