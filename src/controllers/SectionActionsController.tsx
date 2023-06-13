import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import SectionActionsView from "../views/SectionActionsView";

const SectionActionsController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();

  if (!account) {
    return <></>;
  }

  return (
    <SectionActionsView>
      <sock-buy href="#ticket-buy" />
    </SectionActionsView>
  );
};

export default SectionActionsController;
