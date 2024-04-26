import Account from '@/app/(app)/account/page'
import { create } from 'zustand'
import { Address, Chain, Hash } from '../types/types'
import { goerli, sepolia, mainnet, devnet, katana } from '../chains'
import { RpcProvider } from 'starknet'

const provider = new RpcProvider({
    nodeUrl: "https://free-rpc.nethermind.io/mainnet-juno/"
})

// type Account = {}
export const chains = {
    "mainnet": mainnet,
    "sepolia": sepolia,
    "goerli": goerli,
    "katana": katana,
    "devnet": devnet,
}

export type CairoContext = {
    cairo_version: '2.6.0' | '2.6.1' | '2.6.2' | '2.6.3',
    environment: Chain,
    provider: RpcProvider,
    contracts: Contract[]

    updateCairoVersion: (cairo_version: CairoContext['cairo_version']) => void
    changeEnvironment: (new_env: "mainnet" | "sepolia" | "goerli" | "katana" | "devnet") => void
    addContract: (contract_address: Address) => void;
}

export const useCairoContext = create<CairoContext>()((set) => ({
    cairo_version: "2.6.3",
    environment: sepolia,
    provider: new RpcProvider({
        nodeUrl: sepolia.rpcUrls.default.http[0]
    }),
    contracts: [{
        contract_address: '0xWiseMrMusa',
        contract_abi: [
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
    }],

    updateCairoVersion(cairo_version_) {
        set(() => ({
            cairo_version: cairo_version_
        }))
    },
    changeEnvironment(new_env) {
        set(() => ({
            environment: chains[new_env],
            provider: new RpcProvider({
                nodeUrl: chains[new_env].rpcUrls.default.http[0]
            }),
        }))
    },
    async addContract(contract_address) {
        let result = await provider.getClassAt(contract_address, "latest").then(
        );
        let new_contracts = {
            contract_address: contract_address,
            contract_abi: result.abi
        }
        set((state) => ({ contracts: state.contracts.concat([new_contracts]) }))
    },

}))

export type Contract = {
    contract_address: Address,
    contract_hash?: Hash,
    contract_abi: {
        "type": "function" | "event",
        "name": string,
        "inputs": any,
        "outputs": any,
        "state_mutability": "external" | "view"
    }[]
}