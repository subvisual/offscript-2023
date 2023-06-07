import { FC } from "react";

import SectionTicketSuccessView from "../views/SectionTicketSuccessView";

import { useTicket } from "../lib/TicketContext";

const SectionTicketSuccessController: FC = () => {
  const { ticketTx } = useTicket();

  if (!ticketTx) {
    return <></>;
  }

  return (
    <SectionTicketSuccessView>
      <sock-hash
        target="_blank"
        href={`http://etherscan.io/tx/${ticketTx.hash}`}
      >
        <sock-ticket-hash />
      </sock-hash>
    </SectionTicketSuccessView>
  );
};

export default SectionTicketSuccessController;
