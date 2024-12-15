"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import { useState, useRef } from "react"
import { useSearchParam } from "@/hook/use-search-param"

export default function SearchInput() {
    const [, setSearch] = useSearchParam("search")

    const [value, setValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(value)
        inputRef.current?.blur()
    }

    return (
        <div className="flex-1 flex items-center justify-center">  
            <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
                <Input placeholder="Search" 
                value={value}
                onChange={handleChange}
                ref={inputRef}
                className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3), 0_1px_3px_1px_rgba(65,69,73,.15)]
                    bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white
                "/>
                <Button type="submit" variant="ghost" size="icon"  
                className="absolute left-3 top-1/2 -translate-y-1/2 -translate-y-1/2 [&_svg]:size-5">
                    <SearchIcon className="w-4 h-4" />
                </Button>
                {value && (
                    <Button type="button" variant="ghost" size="icon"  
                    className="absolute right-3 top-1/2 -translate-y-1/2 -translate-y-1/2 [&_svg]:size-5"
                    onClick={() => {
                        setValue("")
                        setSearch("")
                        inputRef.current?.blur()
                    }}
                    >
                        <XIcon className="w-4 h-4" />
                    </Button>
                )}
            </form>
        </div>
    )
}
