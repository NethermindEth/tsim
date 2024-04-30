
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Result, type Contract } from "starknet"
import { useRef, useState } from "react"
import { feltToString } from "@/lib/utils"
import { v4 as uuidv4 } from 'uuid';

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
        <div key={uuidv4()} className="grid w-full items-center gap-8 ">
            {abi_
                .filter((abi) => abi.type == 'function')
                .map((e, i) => {
                    const [output, setOutput] = useState<Result>();
                    let inputsRefs = e.inputs.map(() => useRef<HTMLInputElement>(null));
                    let thisref = useRef<HTMLInputElement>(null)
                    return (
                        <div
                            key={i}
                            className="flex flex-col space-y-1.5 p-2 gap-4">
                            <h2 className="text-lg">{e.name} <span className="text-sm bg-yellow-300 text-black rounded-lg py-0.5 px-2">{e.state_mutability == 'external' ? 'Write' : 'Read'}</span> </h2>
                            {
                                e.inputs.map((e_, i_) => {
                                    let [input, setInput] = useState<string>("")
                                    return (
                                        <div
                                            key={i_ + e_.name}
                                            className="flex flex-col space-y-1.5">
                                            <Label htmlFor={e_.name}>{e_.name}</Label>
                                            <Input id="env" placeholder="" itemRef="" ref={inputsRefs[i_]} value={input} onChange={(e) => setInput(e.target.value)} />
                                        </div>
                                    )
                                })
                            }
                            <Button onClick={async () => {
                                let inputs_ = inputsRefs.map((e) => e.current?.value)
                                //TODO: Handle the arguments correctly and remove the any type
                                const bal1 = await contract.call(e.name, inputs_ as any)
                                console.log(bal1)
                                setOutput(bal1)
                            }}>Transact</Button>
                            {
                                output &&
                                <div className="flex flex-col space-y-1.5">
                                    {e.outputs[0].type == "core::felt252" ? feltToString(output) : output.toString()}
                                </div>
                            }
                        </div>
                    )
                })}
        </div>
    )
}