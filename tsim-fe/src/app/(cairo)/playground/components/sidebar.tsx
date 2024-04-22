"use client"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { useSideNavContext } from "@/lib/store/side-nav"

export const SideBar = () => {
    const { nav, isOpen } = useSideNavContext();
    if (isOpen == true) {
        
        return (
            <>
                <ResizablePanel defaultSize={20}>
                    <div className="flex items-center justify-center p-6 overflow-scroll">
                        
                        {nav + isOpen + " lfhjkjasd"}
                    </div>
                </ResizablePanel>
                <ResizableHandle />
            </>
        )
    } else return null
}

