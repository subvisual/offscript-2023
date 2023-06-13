import { ContractsProvider } from "src/lib/ContractsContext";
import IndexView from "../views/IndexView";
import { TicketProvider } from "src/lib/TicketContext";

export default function Home() {
  return (
     <ContractsProvider>
         <TicketProvider>
           <IndexView />
         </TicketProvider>
     </ContractsProvider>
  );
}
