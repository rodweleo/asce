import { LedgerCanister } from "@dfinity/ledger-icp";
import toast from "react-hot-toast";

export const getIcpAccountBalance = async (accountIdentifier: string) => {
    try {
        const ledger = LedgerCanister.create();

        const balance = await ledger.accountBalance({
            accountIdentifier: accountIdentifier
        });


        return Number(balance)

    } catch (e) {
        toast.error("Error while retrieving the ICP account balance.")
        return 0
    }
}