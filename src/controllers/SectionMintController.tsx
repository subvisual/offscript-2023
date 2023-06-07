import { FC } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { useMint } from "../lib/MintContext";

import SectionMintView from "../views/SectionMintView";

const SectionMintController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { onMintClick, mintTx } = useMint();

  if (!account || mintTx) {
    return <></>;
  }

  return (
    <SectionMintView>
      <sock-mint onClick={onMintClick} />
    </SectionMintView>
  );
};

export default SectionMintController;
