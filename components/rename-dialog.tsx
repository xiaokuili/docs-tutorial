"use client"

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface RenameDialogProps {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
}

export default function RenameDialog({ documentId, initialTitle, children }: RenameDialogProps) {
    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        update({ id: documentId, title: title.trim() || "Untitled" })
            .then(() => {
                setOpen(false);
            })
            .finally(() => {

                setIsUpdating(false);
            });
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Document</DialogTitle>
                        <DialogDescription>
                            Enter a new title for your document.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document name" />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" disabled={isUpdating} onClick={(e) => { e.preventDefault(); setOpen(false) }}>Cancel</Button>
                        <Button disabled={isUpdating} type="submit" onClick={(e) => { e.stopPropagation(); }}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}