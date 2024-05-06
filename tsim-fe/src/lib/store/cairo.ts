import { create } from 'zustand'
import { Address, Chain, Hash } from '../types/types'
import { goerli, sepolia, mainnet, devnet, katana } from '../chains'
import { Account, Contract, RpcProvider, stark } from 'starknet'
import { StarknetWindowObject, connect, disconnect } from 'get-starknet'
import { get } from 'http'
// const provider = new RpcProvider({
//     nodeUrl: "https://free-rpc.nethermind.io/mainnet-juno/"
// })

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
    snConnection: StarknetWindowObject | undefined,
    contracts: ContractDev[],
    updateCairoVersion: (cairo_version: CairoContext['cairo_version']) => void,
    changeEnvironment: (new_env: "mainnet" | "sepolia" | "goerli" | "katana" | "devnet") => void,
    addContract: (contract_address: Address) => void
    connectWallet: () => void
}

export const useCairoContext = create<CairoContext>()((set, get) => ({
    cairo_version: "2.6.3",
    snConnection: undefined,
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
        set((state) => ({
            environment: chains[new_env],
            provider: new RpcProvider({
                nodeUrl: chains[new_env].rpcUrls.default.http[0]
            }),
        }))
    },
    addContract(contract_address) {
        let provider = get().provider
        provider.getClassAt(contract_address, "latest").then(result => {
            set((state) => (
                {
                    contracts: state.contracts.concat([{
                        contract_address: contract_address,
                        environment: state.environment,
                        contract_abi: result.abi,
                        // contract: new Contract(result.abi, contract_address, state.account ? state.account : provider)
                        contract: new Contract(result.abi, contract_address, state.snConnection?.account ? state.snConnection.account : provider)
                    }])
                }))
                console.log(result.abi)
        })
    },
    async connectWallet() {
        let StarknetWindowsObject = await connect({
            modalMode: "alwaysAsk",
            modalTheme: "dark",
        });
        if (!StarknetWindowsObject) {
            return
        }
        set(() => ({ snConnection: StarknetWindowsObject }))
    }

}))

export type ContractDev = {
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
    contract: Contract
}