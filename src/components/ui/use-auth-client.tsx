
import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { canisterId, createActor } from "../../declarations/bizpro-backend";
import { Identity } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";

interface AuthContentProps { isAuthenticated: boolean; signInWithIcpAuthenticator: () => void; logout: () => Promise<void>; authClient: AuthClient | null; identity: Identity | null; principal: Principal | null; whoamiActor: null; }
const AuthContext = createContext<AuthContentProps | null>(null);

export const getIdentityProvider = () => {
    let idpProvider;
    // Safeguard against server rendering
    if (typeof window !== "undefined") {
        const isLocal = process.env.DFX_NETWORK !== "ic";
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isLocal && isSafari) {
            idpProvider = `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
        } else if (isLocal) {
            idpProvider = `https://identity.ic0.app`;
        } else {
            idpProvider = `https://identity.ic0.app`;
        }
    }
    return idpProvider;
};

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
    /**
     *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
     */
    createOptions: {
        idleOptions: {
            disableDefaultIdleCallback: true,
            disableIdle: true
        },
    },
    /**
     * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
     */
    loginOptions: {
        identityProvider: getIdentityProvider(),
        maxTimeToLive: days * hours * nanoseconds,
    },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [principal, setPrincipal] = useState<Principal | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [whoamiActor, setWhoamiActor] = useState<any>(null);

    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        // Initialize AuthClient
        AuthClient.create(options.createOptions).then(async (client) => {
            updateClient(client);
        });
    }, []);

    const signInWithIcpAuthenticator = () => {
        if (authClient) {
            authClient.login({
                ...options.loginOptions,
                onSuccess: () => {
                    initActor()
                    updateClient(authClient);
                    toast.success(`Welcome back ${authClient.getIdentity().getPrincipal()}`)

                    const loggedInUser = {
                        principal: principal,
                        role: "admin"
                    }

                    dispatch(login(loggedInUser))

                    router.push("/account/admin")

                },
            });
        }

    };


    async function updateClient(client: AuthClient) {
        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthClient(client);

        const actor = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        setWhoamiActor(actor);
    }

    const initActor = () => {
        const actor = createActor(canisterId as string, {
            agentOptions: {
                identity: authClient?.getIdentity(),
            },
        });
        setWhoamiActor(actor);
    };

    async function logout() {
        if (authClient) {
            await authClient.logout();
            await updateClient(authClient);
        }
    }

    useEffect(() => {
        if (isAuthenticated) initActor();
    }, [isAuthenticated]);

    return {
        isAuthenticated,
        signInWithIcpAuthenticator,
        logout,
        authClient,
        identity,
        principal,
        whoamiActor,
    };
};

/**
 * @type {React.FC}
 */

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuthClient();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);