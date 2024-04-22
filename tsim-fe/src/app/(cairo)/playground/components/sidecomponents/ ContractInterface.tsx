
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const abi = [
    {
        "type": "function",
        "name": "increase_balance",
        "inputs": [
            {
                "name": "amount",
                "type": "core::felt252"
            }
        ],
        "outputs": [],
        "state_mutability": "external"
    },
    {
        "type": "function",
        "name": "get_balance",
        "inputs": [],
        "outputs": [
            {
                "type": "core::felt252"
            }
        ],
        "state_mutability": "view"
    },
    {
        "type": "function",
        "name": "get_two",
        "inputs": [],
        "outputs": [
            {
                "type": "core::felt252"
            }
        ],
        "state_mutability": "view"
    }
]


export const ContractInterface = ({ abi_ }: { abi_: typeof abi }) => {
    return (
        <div className="grid w-full items-center gap-8 ">
            {abi_.map((e, i) => {
                return (
                    <div className="flex flex-col space-y-1.5">
                        <h2 className="text-lg">{e.name} <span className="text-sm bg-yellow-300 text-black rounded-lg py-0.5 px-2">{e.state_mutability}</span> </h2> 
                        
                        {
                            e.inputs.map((e_, i_) => {
                                return (
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor={e_.name}>{e_.name}</Label>
                                        <Input id="env" placeholder="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}