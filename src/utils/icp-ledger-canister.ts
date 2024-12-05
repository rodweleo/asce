import { AuthClient } from "@dfinity/auth-client";
import { Account, AccountIdentifier, Icrc1TransferRequest, LedgerCanister } from "@dfinity/ledger-icp";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { createAgent } from "@dfinity/utils";
import toast from "react-hot-toast";


export const initAuthClient = async () => {
    const authClient = await AuthClient.create();

    return authClient;
}

export const initIcpLedger = async (ledgerCanisterId?: string) => {
    try {

        const authClient = await initAuthClient();

        const canisterId = ledgerCanisterId ? ledgerCanisterId : "ryjl3-tyaaa-aaaaa-aaaba-cai"

        const LEDGER_CANISTER_ID: Principal = Principal.fromText(canisterId);

        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity()

            const agent = await createAgent({
                identity,
                // host: process.env.DFX_NETWORK === 'ic' ? 'https://icp-api.io' : 'http://localhost:4943',
                host: 'https://icp-api.io'
            })

            const ledger = LedgerCanister.create({
                agent,
                canisterId: LEDGER_CANISTER_ID
            });

            return ledger
        }

    } catch (e) {

        return null;
    }
}


export const getIcpBalances = async () => {

    const icpLedger = await initIcpLedger();

    const authClient = await initAuthClient();
    const identity = authClient.getIdentity()
    const principal = identity.getPrincipal()

    if (!icpLedger) {
        return BigInt(0)
    }

    const ledgerBalance = await icpLedger.accountBalance({
        accountIdentifier: AccountIdentifier.fromPrincipal({
            principal: principal,
        }),
        certified: true,
    }) || BigInt(0);

    return ledgerBalance
}

export const transferIcpToken = async (toPrincipal: string, amount: number) => {

    const ledgerCanister = await initIcpLedger();

    if (!ledgerCanister) return

    const toAccount: Account = {
        owner: Principal.fromText(toPrincipal),
        subaccount: [], // default subaccount
    };

    const transferAmount = BigInt(Math.floor(amount * 100000000)); // Convert to e8s

    const request: Icrc1TransferRequest = {
        to: toAccount,
        amount: transferAmount,
        createdAt: BigInt(Date.now() * 1000000), // Convert to nanoseconds
    };

    try {
        const blockHeight = await ledgerCanister.icrc1Transfer(request);
        return blockHeight;
    } catch (error) {
        toast.error(`Transfer failed: ${error.message}`);

        return null;
    }
}


//Integrating Ascecoin ICRC Token
export const initAscecoinLedger = async (ledgerCanisterId?: string) => {
    try {

        const authClient = await initAuthClient();

        const canisterId = ledgerCanisterId ? ledgerCanisterId : "lradw-laaaa-aaaam-acrda-cai"

        const LEDGER_CANISTER_ID: Principal = Principal.fromText(canisterId);

        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity()

            const agent = await createAgent({
                identity,
                // host: process.env.DFX_NETWORK === 'ic' ? 'https://icp-api.io' : 'http://localhost:4943',
                host: 'https://icp-api.io'
            })

            const ascecoinLedger = IcrcLedgerCanister.create({
                agent,
                canisterId: LEDGER_CANISTER_ID
            });

            return ascecoinLedger
        }

    } catch (e) {

        return null;
    }
}


export const getAscecoinBalances = async () => {

    const ascecoinLedger = await initAscecoinLedger();

    const authClient = await initAuthClient();
    const identity = authClient.getIdentity()
    const principal = identity.getPrincipal()

    if (!ascecoinLedger) {
        return BigInt(0)
    }

    const ledgerBalance = await ascecoinLedger.balance({
        owner: principal
    })

    return ledgerBalance
}

export const transferAscecoinToken = async (toPrincipal: string, amount: number) => {

    const ascecoinLedger = await initAscecoinLedger();

    if (!ascecoinLedger) return

    const toAccount: Account = {
        owner: Principal.fromText(toPrincipal),
        subaccount: [], // default subaccount
    };

    const transferAmount = BigInt(Math.floor(amount * 100000000)); // Convert to e8s

    const request: Icrc1TransferRequest = {
        to: toAccount,
        amount: transferAmount,
        createdAt: BigInt(Date.now() * 1000000), // Convert to nanoseconds
    };

    try {
        const blockHeight = await ascecoinLedger.transfer(request);
        return blockHeight;
    } catch (error) {
        toast.error(`Ascecoin transfer failed: ${error.message}`);

        return null;
    }
}