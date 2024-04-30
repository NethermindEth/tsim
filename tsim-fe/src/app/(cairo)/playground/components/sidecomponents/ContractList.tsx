import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContractInterface } from "./ ContractInterface";
import { ContractDev } from "@/lib/store/cairo";

export function ContractList({contracts}: {contracts : ContractDev[]}) {
    return (
        <Accordion type="single" collapsible className="max-w-full gap-4 p-4" >
            {
                contracts.map((contract, i) => {
                    return (
                        <AccordionItem value={contract.contract_address}>
                            <AccordionTrigger>{contract.contract_address.slice(0,8)+"..."+contract.contract_address.slice(-5)}</AccordionTrigger>
                            <AccordionContent>
                                <ContractInterface abi_={contract.contract_abi} contract={contract.contract}  key={i}/>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}