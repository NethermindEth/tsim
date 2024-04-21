import { create } from 'zustand'

export type SideNavContext = { 
    nav: 'file' | 'search' | 'compile' | 'deploy' | 'debug'
    isOpen: boolean
    updateNav: (nav: SideNavContext['nav']) => void
    toggleBar: () => void
}

export const useSideNavContext = create<SideNavContext>()((set) => ({
    nav: 'file',
    isOpen: true,
    updateNav: (nav: SideNavContext['nav']) => set(() => ({
        isOpen: true,
        nav : nav,
    })
    ),
    toggleBar: () => set((state) => ({
        isOpen: !state.isOpen
    }))
}))

