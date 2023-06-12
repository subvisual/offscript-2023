import type { FC } from "react";
import type { Web3Provider } from "@ethersproject/providers";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useWeb3React } from "@web3-react/core";

import { useContracts } from "./ContractsContext";

interface Asset {
  tokenId: number;
  discount: number;
  name: string;
  image: string;
}

interface MintContext {
  onMintClick: () => void;
  mintTx?: any;
  mined: boolean;
  assets: Asset[];
  bestAsset?: Asset;
}

const MintContext = createContext<MintContext>({
  mined: false,
  assets: [],
  onMintClick: () => {
    /* do nothing */
  },
});

interface Props{
  children: React.ReactNode
}

export function MintProvider({ children }: Props) {
  const { library, account } = useWeb3React<Web3Provider>();
  const [mintTx, setMintTx] = useState<any>();
  const [mined, setMined] = useState(false);
  const {  ticketContract, signer } = useContracts();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [bestAsset, setBestAsset] = useState<Asset | undefined>();

  const onMintClick = useCallback(() => {
  }, []);
  

  useEffect(() => {
    (async function () {
      if (!mintTx) {
        return;
      }

      try {
        console.log("waiting");
        await mintTx.wait();
        console.log("waited");

        setMined(true);
      } finally {
        setMined(false);
      }
    })();
  }, [mintTx]);

  // set assets
  useEffect(() => {
    })();
  }, []);

  // set bestAsset
  useEffect(() => {
      }, []);

  return (
    <MintContext.Provider
      value={{ onMintClick, mintTx, mined, assets, bestAsset }}
    >
      {children}
    </MintContext.Provider>
  );
};

export const useMint = (): MintContext => useContext(MintContext);
