
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { type Contract } from "starknet"

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


export const ContractInterface = ({ abi_, contract }: { abi_: typeof abi, contract: Contract }) => {
    return (
        <div className="grid w-full items-center gap-8 ">
            {abi_
                .filter((abi) => abi.type == 'function')
                .map((e, i) => {
                    return (
                        <div className="flex flex-col space-y-1.5 p-2 gap-4">
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
                            <Button onClick={async () => { 
                                console.log(e.name)
                                const bal1 = await contract.call(e.name)
                                console.log('Initial balance =', bal1.toString())
                                }}>Transact</Button>
                        </div>
                    )
                })}
        </div>
    )
}