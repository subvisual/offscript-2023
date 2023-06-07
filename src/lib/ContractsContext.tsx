import type { FC } from "react";
import type { Contract, Signer } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { createContext, useContext, useState, useEffect } from "react";

interface ContractsContext {
  nftContract?: Contract;
  ticketContract?: Contract;
  dai?: Contract;
  usdc?: Contract;
  usdt?: Contract;
  signer?: Signer;
}

import ticketABI from "./abis/ticket.json";
import nftABI from "./abis/nft.json";
import ERC20ABI from "./abis/erc20.json";

const ContractsContext = createContext<ContractsContext>({});

const Addresses: Record<number | string, string> =
  process.env.NODE_ENV === "production"
    ? {
        nft: "0xe943A95D7aEB81aa7431d49e2Df048989C10FB70",
        ticket: "0xC56923CFaB78C785fA49B182dF4a9eeB54663113",
        DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      }
    : {
        nft: "0x546C74767d6d24ab4449334Ba74888e1218178D8",
        ticket: "0x87a4864accf6fe6614a3430d96dc3c321c21a77a",
        DAI: "0x7d815e5d47a7b2245b78084fc8bd3e0ac67b3305",
        USDC: "0x7f035182a1213e7b48089e61a7724067aa9bcf19",
        USDT: "0xf44ca6800b4b695859ee97b2e0953cb55968b1da",
      };

interface Props{
  children: React.ReactNode
}

export function ContractsProvider({ children }: Props) {
  const { chainId, library } = useWeb3React<Web3Provider>();

  const [contracts, setContracts] = useState<Record<string, Contract | Signer>>(
    {}
  );

  useEffect(() => {
    if (!library || !chainId) return;

    const nftContract = new ethers.Contract(Addresses.nft, nftABI, library);
    const ticketContract = new ethers.Contract(
      Addresses.ticket,
      ticketABI,
      library
    );
    const dai = new ethers.Contract(Addresses.DAI, ERC20ABI, library);
    const usdc = new ethers.Contract(Addresses.USDC, ERC20ABI, library);
    const usdt = new ethers.Contract(Addresses.USDT, ERC20ABI, library);
    const signer = library.getSigner(0);
    // nftContract.price().then((c: any) => console.log(c));

    // console.log(nftContract);
    setContracts({ nftContract, ticketContract, dai, usdc, usdt, signer });
  }, [chainId, library]);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = (): ContractsContext =>
  useContext(ContractsContext);
