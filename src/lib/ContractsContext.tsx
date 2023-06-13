import type { FC } from "react";
import type { Contract, Signer } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";

import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { createContext, useContext, useState, useEffect } from "react";

interface ContractsContext {
  ticketContract?: Contract;
  dai?: Contract;
  usdc?: Contract;
  usdt?: Contract;
  signer?: Signer;
}

import paymentABI from "./abis/payment.json";
import ERC20ABI from "./abis/erc20.json";

const ContractsContext = createContext<ContractsContext>({});

const Addresses: Record<number | string, string> =
  process.env.NEXT_PUBLIC_CHAIN_ID === "1"
    ? {
        ticket: "0x687bb6c57915aa2529efc7d2a26668855e022fae",
        DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      }
    : {
        ticket: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707",
        DAI: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        USDC: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        USDT: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
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

    const ticketContract = new ethers.Contract(
      Addresses.ticket,
      paymentABI,
      library
    );
    const dai = new ethers.Contract(Addresses.DAI, ERC20ABI, library);
    const usdc = new ethers.Contract(Addresses.USDC, ERC20ABI, library);
    const usdt = new ethers.Contract(Addresses.USDT, ERC20ABI, library);
    const signer = library.getSigner(0);

    setContracts({ ticketContract, dai, usdc, usdt, signer });
  }, [chainId, library]);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = (): ContractsContext =>
  useContext(ContractsContext);
