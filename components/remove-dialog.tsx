"use client"

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

export default function RemoveDialog({ documentId, children }: RemoveDialogProps) {
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.This will permanently delete the document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                        e.stopPropagation();
                        setIsRemoving(true);
                        remove({ id: documentId })
                            .finally(() => {
                                setIsRemoving(false);
                            });
                    }} disabled={isRemoving}>
                        {isRemoving ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}