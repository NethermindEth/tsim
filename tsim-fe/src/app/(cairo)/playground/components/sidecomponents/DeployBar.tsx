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


export const DeployedContractBar = () => {
    return (
                <div className="p-6 gap-6 flex flex-col">
                    <h1 className="font-bold">Deploy and Run Transactions</h1>

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
    return (
                <div className="p-6 gap-6 flex flex-col overflow-scroll">
                    <h1 className="font-bold">Deploy and Run Transactions</h1>

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

                <AccordionDemo />
                {/* <DeployedContractBar /> */}
                </div>
    )
}


  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
          <DeployedContractBar />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
          <DeployedContractBar />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
          <DeployedContractBar />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  
