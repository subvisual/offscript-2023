import type { Signer } from "ethers";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

import { useContracts } from "./ContractsContext";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

interface TicketContext {
  approvalTx?: any;
  ticketTx?: any;
  hasTicket: boolean;
  approvalMined: boolean;
  ticketMined: boolean;
  email?: string;
  currency?: string;
  supply: number;
  onTicketClick: (
    email?: string,
    currency?: string,
    ticketType?: string
  ) => void;
}

const TicketContext = createContext<TicketContext>({
  approvalMined: false,
  ticketMined: false,
  hasTicket: false,
  supply: 0,
  onTicketClick: () => {
    /* do nothing */
  },
});

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

async function signData(signer: Signer, email: string) {
  return signer.signMessage(
    JSON.stringify({ email, address: await signer.getAddress() })
  );
}

async function submitData(
  email: string,
  signature: string,
  address: string
) {
  const data = {
    "form-name": "ticket-sales",
    email,
    signature,
    address,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // TODO: this
  return await fetch("https://ticket.web3creatives.com/", {
    method: "POST",
    headers,
    body: encode(data),
  });
}

interface Props {
  children: React.ReactNode
}

export function TicketProvider({ children }: Props) {
  const { account } = useWeb3React<Web3Provider>();
  const { ticketContract, signer, dai, usdc, usdt } = useContracts();

  const [args, setArgs] = useState<Record<string, any> | undefined>();

  const [approvalTx, setApprovalTx] = useState<any>();
  const [approvalMined, setApprovalMined] = useState<boolean>(false);
  const [ticketTx, setTicketTx] = useState<any>();
  const [ticketMined, setTicketMined] = useState<boolean>(false);
  const [hasTicket, setHasTicket] = useState(false);
  const [supply, setSupply] = useState(0);

  // find existing ticket
  useEffect(() => {
    (async function () {
      if (!ticketContract || !signer) {
        return;
      }
      const filter = ticketContract.filters.Payment(await signer.getAddress());
      const events = await ticketContract.queryFilter(filter);

      if (events.length > 0) {
        setHasTicket(true);
      }
    })();
  }, [ticketContract, signer]);

  // find supply
  useEffect(() => {
    (async function () {
      if (!ticketContract) {
        return;
      }

      const supply = await ticketContract.remainingSupply();
      setSupply(supply);
    })();
  }, [ticketContract]);

  // sign data
  const onTicketClick = useCallback(
    (email?: string, currency?: string, ticketType?: string) => {
      (async function () {
        if (!signer || !email || !currency || !ticketContract)
          return;

        const sig = await signData(signer, email);

        if (process.env.NODE_ENV == "production") {
          await submitData(email, sig, await signer.getAddress());
        }

        setArgs({ currency, email });
      })();
    },
    [signer, ticketContract, ticketMined]
  );

  // approve token transfer
  useEffect(() => {
    (async function () {
      if (!args || !signer || !ticketContract) {
        return;
      }
      const { currency } = args as any;

      if (currency == "ETH") {
        setApprovalMined(true);
        return;
      } else {
        let token;
        switch (currency) {
          case "DAI":
            token = dai;
            break;
          case "USDT":
            token = usdt;
            break;
          case "USDC":
            token = usdc;
            break;
        }

        if (!token) {
          return;
        }

        const allowance = await token
          .connect(signer)
          .allowance(await signer.getAddress(), ticketContract.address);

        let price = await ticketContract
          .connect(signer)
          .getPriceForBuyer(account, token.address);
        price = price.mul(110).div(100);

        if (price.lte(allowance)) {
          setApprovalMined(true);
        } else {
          const tx = await token
            .connect(signer)
            .approve(ticketContract.address, price);
          setApprovalTx(tx);
        }
      }
    })();
  }, [args, signer, ticketContract]);

  useEffect(() => {
    (async function () {
      if (!approvalTx) {
        return;
      }

      try {
        await approvalTx.wait();
        setApprovalMined(true);
      } finally {
        setApprovalMined(false);
      }
    })();
  }, [approvalTx]);

  // make transfer
  useEffect(() => {
    console.log('here');
    (async function () {
      if (!approvalMined || !args || !ticketContract || !signer) {
        return;
      }

      const { currency } = args as any;

      let tx;
      if (currency == "ETH") {
        let ethPrice = await ticketContract
          .connect(signer)
          .getPriceForBuyer(account, "0x0000000000000000000000000000000000000000");
        ethPrice = ethPrice.mul(110).div(100);
        console.log(ethPrice);
        tx = await ticketContract
          .connect(signer)
          .payWithEth({ value: ethPrice });
      } else {
        let token;
        switch (currency) {
          case "DAI":
            token = dai;
            break;
          case "USDT":
            token = usdt;
            break;
          case "USDC":
            token = usdc;
            break;
        }

        if (!token) {
          return;
        }

        tx = await ticketContract
          .connect(signer)
          .payWithERC20(token.address);
      }

      setTicketTx(tx);
    })();
  }, [approvalMined, args, ticketContract, signer]);

  // wait for ticketTx
  useEffect(() => {
    (async function () {
      if (!ticketTx) {
        return;
      }

      try {
        await ticketTx.wait();
        setTicketMined(true);
      } finally {
        setTicketMined(false);
      }
    })();
  }, [ticketTx]);

  return (
    <TicketContext.Provider
      value={{
        onTicketClick,
        approvalTx,
        ticketTx,
        approvalMined,
        ticketMined,
        hasTicket,
        supply,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = (): TicketContext => useContext(TicketContext);
