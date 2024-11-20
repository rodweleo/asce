import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <main className={roboto.className}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </main>
  )
}
