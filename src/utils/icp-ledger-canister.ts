import { AuthClient } from "@dfinity/auth-client";
import { Account, AccountIdentifier, Icrc1TransferRequest, LedgerCanister } from "@dfinity/ledger-icp";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import toast from "react-hot-toast";
import { HttpAgent } from '@dfinity/agent';

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

            const isLocalDevelopment = process.env.DFX_NETWORK !== 'ic';

            const agent = await HttpAgent.create({
                identity,
                host: isLocalDevelopment ? 'http://localhost:4943' : 'https://ic0.app'
            });

            if (isLocalDevelopment) {
                await agent.fetchRootKey();
            }

            const ledger = LedgerCanister.create({
                agent,
                canisterId: LEDGER_CANISTER_ID
            });

            return ledger
        } else {

            //trigger a fresh authenticaion using internet identity

            throw new Error("User not authenticated.")
        }

    } catch (e) {
        console.error("Error initializing ICP ledger:", e);
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

        console.log(error)
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


            const isLocalDevelopment = process.env.DFX_NETWORK !== 'ic';

            const agent = await HttpAgent.create({
                identity,
                host: isLocalDevelopment ? 'http://localhost:4943' : 'https://ic0.app'
            });

            if (isLocalDevelopment) {
                await agent.fetchRootKey();
            }


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