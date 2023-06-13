import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

const queryClient = new QueryClient();

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function App({ Component }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Offscript Tickets</title>
        <meta name="description" content="A web3 demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component />
        </Web3ReactProvider>
      </main>
    </QueryClientProvider>
  );
}
