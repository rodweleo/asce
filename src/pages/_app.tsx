import { SidebarProvider } from "../components/ui/sidebar";
import "@/styles/globals.css";
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { AuthProvider } from "@/components/ui/use-auth-client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from "@/redux/store";
import "@nfid/identitykit/react/styles.css"
import { IdentityKitProvider } from "@nfid/identitykit/react"
import LoginModal from "@/components/ui/login-modal";
import { ChatbotModal, ChatbotModalTrigger } from "@/components/ui/chatbot-modal";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Extend AppProps to use the new NextPageWithLayout type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
      }
    }
  })

  return getLayout(
    <main className="">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IdentityKitProvider
            signerClientOptions={{
              targets: ["7w546-riaaa-aaaaj-azwja-cai"]
            }}>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                  <Component {...pageProps} />
                  <LoginModal />
                  <ChatbotModal />
                  <ChatbotModalTrigger />
                  <Toaster />
                </SidebarProvider>
              </QueryClientProvider>
            </AuthProvider>
          </IdentityKitProvider>
        </PersistGate>
      </Provider>
    </main>
  )
}
