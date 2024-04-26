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
    contracts: [],

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
        set((state) => ({ contracts: state.contracts.concat([{
          contract_address: contract_address,
          environment: state.environment,
          contract_abi: result.abi
      }]) }))
    },

}))

export type Contract = {
    contract_address: Address,
    environment: Chain,
    contract_hash?: Hash,
    contract_abi: {
        "type": "function" | "event",
        "name": string,
        "inputs": any,
        "outputs": any,
        "state_mutability": "external" | "view"
    }[]
}