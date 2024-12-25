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
import { useRouter } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner"

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

export default function RemoveDialog({ documentId, children }: RemoveDialogProps) {
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);
    const router = useRouter()


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
                    <AlertDialogCancel onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        setIsRemoving(true);
                        router.push("/")
                        remove({ id: documentId })
                            .catch(() => {
                                toast.error("Failed to delete document. Please try again.")
                            }).then(() => {

                                toast.success("Document deleted")
                            })
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