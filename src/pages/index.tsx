// import { ContractsProvider } from "@/lib/ContractsContext";
// import { MintProvider } from "@/lib/MintContext";
// import { TicketProvider } from "@/lib/TicketContext";
import IndexView from "../views/IndexView";

export default function Home() {
  return (
    <IndexView />
    // <ContractsProvider>
    //   <MintProvider>
    //     <TicketProvider>
    //     </TicketProvider>
    //   </MintProvider>
    // </ContractsProvider>
  );
}
