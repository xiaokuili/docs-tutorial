"use client"
import { Undo, Redo, Printer, LucideIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState } from "react"
  

interface ToolbarButtonProps {
    Icon: LucideIcon
    onClick: () => void
    isActive: boolean
}

const ToolbarButton = ({ Icon, onClick, isActive }: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                " h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200  px-1.5 overflow-hidden text-neutral-700",
                isActive && "bg-neutral-200"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}



export default function Toolbar() {
    const items = [
     [
        {
            icon: Undo,
            onClick: () => {},
            isActive: false
        },
        {
            icon: Redo, 
            onClick: () => {},
            isActive: false
        },
        {
            icon: Printer,
            onClick: () => {},
            isActive: false
        }
     ]
    ]

  return (
      <div className="flex flex-wrap  p-1 border border-gray-200 bg-white rounded-md shadow-sm items-center">
        {items[0].map((item, index) => (
            <ToolbarButton key={index} Icon={item.icon} onClick={item.onClick} isActive={item.isActive} />
        ))}

        <Separator orientation="vertical" className="mx-2 h-6" />
        
        <HeadButton />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* font-size */}
        
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* bold italic underline */}
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* font-color highlight-color */}
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* link image command */}
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* align */}
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* list */}
        <Separator orientation="vertical" className="mx-2 h-6" />
      </div>
  )
}


function HeadButton() {
    const [active, setActive] = useState({label: "normal", Size: "text-base font-normal"})
    const headItems = [
        {label: "H1", Size: "text-2xl font-bold"},
        {label: "H2", Size: "text-xl font-bold"},
        {label: "H3", Size: "text-lg font-bold"},
        {label: "H4", Size: "text-base font-bold"},
        {label: "H5", Size: "text-sm font-bold"},
        {label: "normal", Size: "text-base font-normal"}
    ]
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button
                // TODO: add onclick
                onClick={() => {}}
                className={
                    " h-7 min-w-28 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200  px-1.5 overflow-hidden "
                }
            >
                {active && (
                    <>
                        <span className={cn(active.Size, "text-neutral-700")}>{active.label}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-neutral-700" />
                    </>
                )}
                
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {headItems.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => setActive(item)}>
                        <span className={item.Size}>{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function FontFamilyButton() {
    const [active, setActive] = useState({label: "Arial", fontFamily: "Arial"})
    const fontItems = [
        {label: "Arial", fontFamily: "Arial"},
        {label: "Times New Roman", fontFamily: "Times New Roman"},
        {label: "Courier New", fontFamily: "Courier New"}, 
        {label: "Georgia", fontFamily: "Georgia"},
        {label: "Verdana", fontFamily: "Verdana"}
    ]
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button
                onClick={() => {}}
                className={
                    "h-7 min-w-44 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden"
                }
            >
                {active && (
                    <>
                        <span className="text-neutral-700" style={{fontFamily: active.fontFamily}}>{active.label}</span>
                        <ChevronDown className="ml-2 h-4 w-4 text-neutral-700" />
                    </>
                )}
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {fontItems.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => setActive(item)}>
                        <span style={{fontFamily: item.fontFamily}}>{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
