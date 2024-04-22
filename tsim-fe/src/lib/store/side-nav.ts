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
    updateNav: (_nav: SideNavContext['nav']) => set((state) => ({
        isOpen: true,
        nav : _nav,
    })
    ),
    toggleBar: () => set((state) => ({
        isOpen: !state.isOpen,
        nav: state.nav
    }))
}))

