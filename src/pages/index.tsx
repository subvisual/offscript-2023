import { ContractsProvider } from "src/lib/ContractsContext";
import IndexView from "../views/IndexView";
import { MintProvider } from "src/lib/MintContext";
import { TicketProvider } from "src/lib/TicketContext";

export default function Home() {
  return (
     <ContractsProvider>
       <MintProvider>
         <TicketProvider>
           <IndexView />
         </TicketProvider>
       </MintProvider>
     </ContractsProvider>
  );
}
