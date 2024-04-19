import { create } from 'zustand'

type CodeContext = {
    code: string
    upd: (val: string) => void
}

export const useCodeContext = create<CodeContext>()((set) => ({
    code: "Hello World",
    upd: (val: string) => set(() => ({code: val}))
}))