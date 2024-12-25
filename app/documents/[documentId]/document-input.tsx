"use client"
import { useEffect } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { Id } from "@/convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDebounce } from "@/hook/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react/suspense";
import { LoaderIcon } from "lucide-react";
import { BsCloudSlash } from "react-icons/bs";


interface DocumentInputProps {
    title: string
    id: Id<"documents">
}

export const DocumentInput = ({title, id}: DocumentInputProps) => {
    const status = useStatus();
    const [value, setValue] = useState(title)
    useEffect(()=>{
        setValue(title)
    },[title])

    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const debouncedUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return;
        setIsPending(true);
        mutate({
            id: id,
            title: newValue
        }).then(() => {
            toast.success("Document title updated")
        }).catch(() => {
            toast.error("Failed to update document title")
        }).finally(() => {
            setIsPending(false)
        });
    }, 500);
    const inputRef = useRef<HTMLInputElement>(null)

    const mutate = useMutation(api.documents.updateById)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        debouncedUpdate(newValue)
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true);
        mutate({
            id: id,
            title: value
        }).then(() => {
            toast.success("Document title updated")
            setIsEditing(false)
        }).catch(() => {
            toast.error("Failed to update document title")
        }).finally(() => {
            setIsPending(false)
        });
    }
    const showLoader = isPending || status === "connecting" || status === "reconnecting"
    const showError = status === "disconnected"
    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form className="relative w-fit max-w-[50ch] " onSubmit={handleSubmit}>
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {value || " " }
                    </span>
                    <input type="text" 
                        ref={inputRef}
                        value={value}
                        onBlur={() => setIsEditing(false)}
                        onChange={onChange}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate  "
                        />
                </form>
            ) : (
                <span 
                    onClick={() => {
                        setIsEditing(true)
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 0)
                    }}
                    className="text-lg px-1.5 cursor-pointer">{value || "Untitled Document"}
                </span>
            )}
            {!showError && !showLoader && <BsCloudCheck className="size-4 text-foreground"/>}
            {showError && <BsCloudSlash className="size-4 text-foreground"/>}
            {showLoader && <LoaderIcon className="size-4 animate-spin text-foreground"/>}
        </div>
    )
}