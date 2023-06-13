import { FC, useState, useCallback, useEffect } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { useTicket } from "../lib/TicketContext";

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

const Price = 1065;
const DiscountedPrice = 850;

const SectionTicketController: FC = () => {
  const { account } = useWeb3React<Web3Provider>();
  const [discount, _setDiscount] = useState(false);
  const { supply, onTicketClick, ticketTx, approvalTx, approvalMined } =
    useTicket();

  const [email, setEmail] = useState<string | undefined>();
  const [currency, setCurrency] = useState<string | undefined>();

  const [notice, setNotice] = useState<string>(" ");

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (supply == 0) {
        return;
      }

      if (
        !validateEmail(email) ||
        !validateCurrency(currency)
      ) {
        return;
      }

      if (approvalTx || ticketTx) {
        return;
      }

      onTicketClick(email, currency);
    },
    [email, currency]
  );

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

        {discount ? (
          <sock-price-1>
            <del>€850</del>&nbsp;<span>€{DiscountedPrice}</span>
          </sock-price-1>
        ) : (
          <sock-price-1 />
        )}
        {!discount ? (
          <sock-price-2>
            <del>€1065</del>&nbsp;<span>€{Price}</span>
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
