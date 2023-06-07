import { FC, useState, useCallback, useEffect } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { useTicket } from "../lib/TicketContext";
import { useMint } from "../lib/MintContext";

import SectionTicketView from "../views/SectionTicketView";

const validateEmail = (email?: string) =>
  email &&
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const validateCurrency = (currency?: string) =>
  currency && ["USDC", "USDT", "DAI", "ETH"].indexOf(currency) != -1;

const validateTicketType = (type?: string) =>
  type && ["regular", "extended"].indexOf(type) != -1;

const RegularPrice = 800;
const ExtendedPrice = 950;

const SectionTicketController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { bestAsset } = useMint();
  const { supply, onTicketClick, ticketTx, approvalTx, approvalMined } =
    useTicket();

  const [email, setEmail] = useState<string | undefined>();
  const [currency, setCurrency] = useState<string | undefined>();
  const [ticketType, setTicketType] = useState<string | undefined>("regular");

  const [regularPrice, setRegularPrice] = useState(RegularPrice);
  const [extendedPrice, setExtendedPrice] = useState(ExtendedPrice);

  const [notice, setNotice] = useState<string>(" ");

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (supply == 0) {
        return;
      }

      if (
        !validateEmail(email) ||
        !validateCurrency(currency) ||
        !validateTicketType(ticketType)
      ) {
        return;
      }

      if (approvalTx || ticketTx) {
        return;
      }

      onTicketClick(email, currency, ticketType);
    },
    [email, currency, ticketType]
  );

  useEffect(() => {
    if (!bestAsset) {
      return;
    }

    setRegularPrice(RegularPrice - (RegularPrice * bestAsset.discount) / 100);
    setExtendedPrice(
      ExtendedPrice - (ExtendedPrice * bestAsset.discount) / 100
    );
  }, [bestAsset]);

  useEffect(() => {
    // already done
    if (ticketTx) {
      return;
    }

    if (supply == 0) {
      setNotice("Crypto tickets not available at the moment.");
    } else if (approvalMined && !ticketTx) {
      setNotice("Just one more step");
    } else if (approvalTx && !approvalMined) {
      setNotice("Waiting for approval tx to be mined...");
    } else if (currency && currency != "ETH") {
      console.log(currency);
      setNotice("You may first need to set a token allowance");
    } else {
      setNotice(" ");
    }
  }, [currency, ticketTx, approvalMined, approvalTx, supply]);

  if (!account || ticketTx) {
    return <></>;
  }

  return (
    <>
      <div id="ticket-buy" />
      <SectionTicketView>
        <sock-email onChange={(e: any) => setEmail(e.target.value)} />
        <sock-currency onChange={(e: any) => setCurrency(e.target.value)} />
        <sock-buy-ticket onClick={onSubmit} />
        <sock-radio-1
          name="ticket-type"
          onChange={() => setTicketType("regular")}
        />
        <sock-radio-2
          name="ticket-type"
          onChange={() => setTicketType("extended")}
        />

        {bestAsset ? (
          <sock-price-1>
            <del>€800</del>&nbsp;<span>€{regularPrice}</span>
          </sock-price-1>
        ) : (
          <sock-price-1 />
        )}
        {bestAsset ? (
          <sock-price-2>
            <del>€950</del>&nbsp;<span>€{extendedPrice}</span>
          </sock-price-2>
        ) : (
          <sock-price-2 />
        )}

        <sock-ticket-notice>{notice}</sock-ticket-notice>
      </SectionTicketView>
    </>
  );
};

export default SectionTicketController;
