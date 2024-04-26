"use client"
import * as React from "react"


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
import { useCairoContext } from "@/lib/store/cairo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Address } from "@/lib/types/types"
import { ContractList } from "./ContractList"


export const DeployedContractBar = () => {

    return (
        <div className="p-6 gap-6 flex flex-col">
            <h1 className="font-bold">Deploy this and Run Transactions</h1>

            <form>
                <div className="grid w-full items-center gap-8 ">

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="environment">Environment</Label>
                        <Select>
                            <SelectTrigger id="environment">
                                <SelectValue placeholder="Choose an Environment" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="mainnet">Mainnet</SelectItem>
                                <SelectItem value="sepolia">Sepolia</SelectItem>
                                <SelectItem value="katana">Katana</SelectItem>
                                <SelectItem value="devnet">Starknet DevNet</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="account">Account</Label>
                        <Select>
                            <SelectTrigger id="account">
                                <SelectValue placeholder="Select an Account" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="account1">Account 1</SelectItem>
                                <SelectItem value="account2">Account 2</SelectItem>
                                <SelectItem value="account3">Account 3</SelectItem>
                                <SelectItem value="account4">Account 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="contract">Contract</Label>
                        <Select>
                            <SelectTrigger id="contract">
                                <SelectValue placeholder="Select a Contract" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="account1">Account 1</SelectItem>
                                <SelectItem value="account2">Account 2</SelectItem>
                                <SelectItem value="account3">Account 3</SelectItem>
                                <SelectItem value="account4">Account 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="env">Contract Class Hash</Label>
                        <Input id="env" placeholder="" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export const DeployBar = () => {
    const { environment, provider, changeEnvironment, addContract, contracts } = useCairoContext();
    const [contAddres, setContAddress] = React.useState<Address | undefined>();
    return (
        <div className="p-6 gap-6 flex flex-col">
            <h1 className="font-bold">Deploy and Run Transactions</h1>
            <React.Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
                <p>{environment.name + "  " + environment.id}</p>
            </React.Suspense>
            <React.Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
                <p>{provider.getChainId()}</p>
            </React.Suspense>

            <form>
                <div className="grid items-center gap-8 ">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="environment">Environment</Label>
                        <Select onValueChange={(e) => changeEnvironment(e as any)}>
                            <SelectTrigger id="environment">
                                <SelectValue placeholder="Choose an Environment" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="mainnet">Mainnet</SelectItem>
                                <SelectItem value="sepolia">Sepolia</SelectItem>
                                <SelectItem value="katana">Katana</SelectItem>
                                <SelectItem value="devnet">Starknet DevNet</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="account">Account</Label>
                        <Select>
                            <SelectTrigger id="account">
                                <SelectValue placeholder="Select an Account" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="account1">Account 1</SelectItem>
                                <SelectItem value="account2">Account 2</SelectItem>
                                <SelectItem value="account3">Account 3</SelectItem>
                                <SelectItem value="account4">Account 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="contract">Contract</Label>
                        <Select>
                            <SelectTrigger id="contract">
                                <SelectValue placeholder="Select a Contract" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="account1">Account 1</SelectItem>
                                <SelectItem value="account2">Account 2</SelectItem>
                                <SelectItem value="account3">Account 3</SelectItem>
                                <SelectItem value="account4">Account 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="flex flex-col space-y-1.5 gap-4 max-w-full">
                        <Label htmlFor="class_hash">Contract Class Hash</Label>
                        <Input id="class_hash" onChange={(e) => { setContAddress(e.target.value as unknown as Address) }} />
                        <Button onClick={(e) => {
                            e.preventDefault()
                            addContract(contAddres ?? "0x")
                        }}>Get Contract</Button>
                        <React.Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
                            <p>{contracts.map((e,i)=> {
                                return(
                                    <p>{e.contract_address}</p>
                                )
                            })}</p>
                        </React.Suspense>
                    </div>
                </div>
            </form>

            <ContractList contracts={contracts} />

        </div>
    )
}