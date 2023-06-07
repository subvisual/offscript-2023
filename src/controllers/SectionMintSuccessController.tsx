import { FC } from "react";

import SectionMintSuccessView from "../views/SectionMintSuccessView";

import { useMint } from "../lib/MintContext";

const SectionMintSuccessController: FC = () => {
  const { mintTx } = useMint();

  if (!mintTx) {
    return <></>;
  }

  return (
    <SectionMintSuccessView>
      <sock-mint-hash
        target="_blank"
        href={`http://etherscan.io/tx/${mintTx.hash}`}
      />
    </SectionMintSuccessView>
  );
};

export default SectionMintSuccessController;
