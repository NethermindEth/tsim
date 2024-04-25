import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContractInterface } from "./ ContractInterface";
import { Contract } from "@/lib/store/cairo";

export function ContractList({contracts}: {contracts : Contract[]}) {
    return (
        <Accordion type="single" collapsible className="w-full gap-4 p-4">
            {
                contracts.map((contract) => {
                    return (
                        <AccordionItem value="item-1">
                            <AccordionTrigger>{contract.contract_address}</AccordionTrigger>
                            <AccordionContent>
                                <ContractInterface abi_={contract.contract_abi} />
                            </AccordionContent>
                        </AccordionItem>

                    )
                })
            }
        </Accordion>
    )
}