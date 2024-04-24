import Account from '@/app/(app)/account/page'
import { create } from 'zustand'
import { Chain } from '../types/types'
import { goerli, sepolia, mainnet, devnet, katana } from '../chains'



// type Account = {}
export const chains = {
    "mainnet" : mainnet,
    "sepolia" : sepolia,
    "goerli" : goerli,
    "katana" : katana,
    "devnet" : devnet,
}

export type CairoContext = {
    cairo_version : '2.6.0' | '2.6.1' | '2.6.2' | '2.6.3',
    environment:  Chain,
    // account: Account,

    updateCairoVersion: (cairo_version: CairoContext['cairo_version']) => void
    changeEnvironment: (new_env:  "mainnet" | "sepolia" | "goerli" | "katana" | "devnet" ) => void
    // updateEnvironment: (chain: Chain) => void 
    // updateAccount: (account: Account) => void
}

export const useCairoContext = create<CairoContext>()((set) => ({
    cairo_version: "2.6.3",
    environment: sepolia,
    account: {},

    updateCairoVersion(cairo_version_) {
        set(() => ({
            cairo_version : cairo_version_
        }))
    },
    changeEnvironment(new_env) {
        set(() => ({
            environment: chains[new_env]
        }))
    }
}))