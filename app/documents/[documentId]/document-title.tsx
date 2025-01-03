

"use client"

import { useState } from "react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"

export default function DocumentTitle() {
    const params = useParams()
    const documentId = params.documentId as Id<"documents">
    const document = useQuery(api.document.getById, { documentId })
    const updateTitle = useMutation(api.document.updateTitle)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(document?.title || "")

    const saveTitle = () => {
        setIsEditing(false)
        if (title !== document?.title) {
            try {
                updateTitle({
                    id: documentId,
                    title
                })
                toast.success("Title updated")
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to update title")
            }
        }
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur(); // 失去焦点
            saveTitle();
          }
    }

    if (!document) return null

    if (isEditing) {
        return (
            <input
                className="text-xl px-1.5 bg-transparent "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={onKeyDown}
                onBlur={saveTitle}
                autoFocus
            />
        )
    }

    return (
        <button 
            onClick={() => setIsEditing(true)}
            className="text-xl px-1.5 hover:bg-gray-100 rounded-sm text-left w-full"
        >
            {document.title}
        </button>
    )
}

