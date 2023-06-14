import { useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

import SectionConnectView from "../views/SectionConnectView";

const injected = new InjectedConnector({
  supportedChainIds: [1, 31337],
});
const network = new NetworkConnector({
  urls: {
    1: process.env.NEXT_PUBLIC_MAINNET_ENDPOINT!,
    31337: "http://127.0.0.1:8545",
  },
  defaultChainId: process.env.NODE_ENV === "production" ? 1 : 31337,
});

const chainId = process.env.NODE_ENV === "production" ? "0x1" : "0x7A69";
console.log(chainId);

function SectionConnectController() {
  const { account, activate } = useWeb3React<Web3Provider>();

  const onConnectBTN = (e: any) => {
    e.preventDefault();
    activate(injected);
  };

  const changeNetwork = async () => {
    const w = window as any;
    if (w.ethereum) {
      try {
        await w.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // connect to network provider
  useEffect(() => {
    activate(network);
  }, [activate]);

  useEffect(() => {
    changeNetwork();
  }, []);

  if (account) {
    return <></>;
  }

  return (
    <SectionConnectView>
      <sock-connect onClick={onConnectBTN} />
    </SectionConnectView>
  );
}

export default SectionConnectController;
