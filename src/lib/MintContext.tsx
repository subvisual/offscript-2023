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
  const { nftContract, ticketContract, signer } = useContracts();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [bestAsset, setBestAsset] = useState<Asset | undefined>();

  const onMintClick = useCallback(() => {
    (async function () {
      if (!nftContract || !signer) return;

      const price = await nftContract.price();
      try {
        const tx = await nftContract
          .connect(signer)
          .mintPublic({ value: price, gasLimit: 150000 });
        console.log(tx.hash);

        setMintTx(tx);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [nftContract, signer]);

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
    (async function () {
      if (!library || !nftContract || !account) {
        return;
      }
      const filter = nftContract.filters.Transfer(null, account);

      const events = await nftContract.queryFilter(filter);

      const result = [];
      for (const event of events) {
        const tokenId = event.args!.tokenId.toNumber();
        const owner = await nftContract.ownerOf(tokenId);

        const uri = await nftContract.tokenURI(tokenId);

        const buffer = Buffer.from(uri.split(",")[1], "base64");
        const metadata = JSON.parse(buffer.toString());

        if (owner == account) {
          result.push({
            tokenId,
            name: metadata.name,
            discount: metadata.attributes.discount,
            image: metadata.image,
          });
        }
      }

      setAssets(result);
    })();
  }, [library, nftContract, account, mined]);

  // set bestAsset
  useEffect(() => {
    (async function () {
      if (!ticketContract) {
        return;
      }

      // TODO filter for payment
      let asset: Asset | undefined;

      for (const current of assets) {
        if (await ticketContract.used(current.tokenId)) {
          continue;
        }
        if (!asset || current.discount > asset.discount) {
          asset = current;
        }
      }

      setBestAsset(asset);
    })();
  }, [ticketContract, assets]);

  return (
    <MintContext.Provider
      value={{ onMintClick, mintTx, mined, assets, bestAsset }}
    >
      {children}
    </MintContext.Provider>
  );
};

export const useMint = (): MintContext => useContext(MintContext);
