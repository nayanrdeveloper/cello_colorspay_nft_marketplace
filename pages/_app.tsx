import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import {
  CeloProvider,
  SupportedProviders,
  Alfajores,
  NetworkNames,
} from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <CeloProvider
        dapp={{
          name: "My awesome dApp",
          description: "My awesome description",
          url: "https://example.com",
          icon: "https://cdn-icons-png.flaticon.com/512/6228/6228867.png",
        }}
        connectModal={{
          // This options changes the title of the modal and can be either a string or a react element
          title: <span>Connect your Wallet</span>,
          providersOptions: {
            // This option hides specific wallets from the default list
            hideFromDefaults: [
              SupportedProviders.MetaMask,
              SupportedProviders.PrivateKey,
              SupportedProviders.CeloExtensionWallet,
              SupportedProviders.Valora,
            ],

            // This option hides all default wallets
            // hideFromDefaults: true,

            // This option toggles on and off the searchbar
            searchable: true,
          },
        }}
        theme={{
          primary: "#fff",
          secondary: "#0d6efd",
          text: "#c2d4f8",
          textSecondary: "#8480ae",
          textTertiary: "#ffffff",
          muted: "#e2e8f0",
          background: "#030205",
          error: "#ef4444",
        }}
        networks={[Alfajores]}
        network={{
          name: NetworkNames.Alfajores,
          rpcUrl: "https://alfajores-forno.celo-testnet.org",
          graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
          explorer: "https://alfajores-blockscout.celo-testnet.org",
          chainId: 44787,
        }}
      >
        <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-60 z-10 py-4 px-6">
          <Sidebar />
        </div>
        <div className="relative md:ml-60">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </CeloProvider>
    </div>
  );
}
