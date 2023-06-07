import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import SectionWalletView from "../views/SectionWalletView";

import { useMint } from "../lib/MintContext";
import { useTicket } from "../lib/TicketContext";

const SectionWalletController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { bestAsset } = useMint();
  const { hasTicket } = useTicket();

  if (!account) {
    return <></>;
  }

  return (
    <SectionWalletView>
      <sock-address>{account}</sock-address>

      {bestAsset && <sock-img src={bestAsset.image} />}
      {bestAsset && (
        <sock-nft-name>
          #{bestAsset.tokenId} - {bestAsset.name}
        </sock-nft-name>
      )}
      {bestAsset && (
        <sock-discount>{bestAsset.discount}% discount</sock-discount>
      )}
      {hasTicket && <sock-already-ticket />}
    </SectionWalletView>
  );
};

export default SectionWalletController;
