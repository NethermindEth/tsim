"use client"

import {
    Code2,
    LifeBuoy,
    SquareUser,
    Triangle,
    Files,
    Search,
    PackageCheck,
    Bug
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import { SideNavContext, useSideNavContext } from "@/lib/store/side-nav"
import { cn } from "@/lib/utils"


const sideNav = [
    {
        id: 1,
        name: "File Explorer",
        nav: "file" as const,
        icon:  <Files className="size-5" />
    },
    {
        id: 2,
        name: "Search",
        nav: "search" as const,
        icon: <Search className="size-5" />
    },
    {
        id: 3,
        name: "Cairo Compiler",
        nav: "compile" as const,
        icon: <Code2 className="size-5" />
    },
    {
        id: 4,
        name: "Deploy and Run Transaction",
        nav: "deploy" as const,
        icon: <PackageCheck className="size-5" />
    },
    {
        id: 5,
        name: "Debug",
        nav: "debug" as const,
        icon: <Bug className="size-5" />
    }
]


export const SideNav = () => {
    const { nav , isOpen, updateNav, toggleBar } = useSideNavContext();
    return (
        <TooltipProvider>
            <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Triangle className="size-5 fill-foreground" />
                    </Button>
                </div>




                <nav className="grid gap-1 p-2">
                    {
                        sideNav.map(
                            (e) => {
                                return (
                                        <Tooltip key={e.id}>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={cn("rounded-lg" , e.nav == nav ? "bg-muted" : "")}
                                                    aria-label={e.name}
                                                    onClick={()=> {
                                                        if (e.nav == nav) {
                                                            toggleBar()
                                                        }
                                                        else {
                                                            updateNav(e.nav satisfies SideNavContext['nav'])
                                                        }
                                                    }}
                                                >
                                                    {e.icon}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" sideOffset={5}>
                                                {e.name}
                                            </TooltipContent>
                                        </Tooltip>
                                )
                            }
                        )
                    }

                </nav>

                <nav className="mt-auto grid gap-1 p-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Help"
                            >
                                <LifeBuoy className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Help
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mt-auto rounded-lg"
                                aria-label="Account"
                            >
                                <SquareUser className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Account
                        </TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
        </TooltipProvider>
    )
}