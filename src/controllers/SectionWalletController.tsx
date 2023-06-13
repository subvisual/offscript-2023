import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import SectionWalletView from "../views/SectionWalletView";

import { useTicket } from "../lib/TicketContext";

const SectionWalletController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { hasTicket } = useTicket();

  if (!account) {
    return <></>;
  }

  return (
    <SectionWalletView>
      <sock-address>{account}</sock-address>

      {hasTicket && <sock-already-ticket />}
    </SectionWalletView>
  );
};

export default SectionWalletController;
