import { Button } from "@/components/ui/button";
import { FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLinkIcon } from "lucide-react";
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";


interface DropdownMenuProps {
    documentId: Id<"documents">;
    onNewTab: () => void;
    title: string;
}

export default function DocumentMenu({ documentId, onNewTab, title }: DropdownMenuProps) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <RenameDialog documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                        <FilePenIcon className="size-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                        <TrashIcon className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem onClick={onNewTab}>
                    <ExternalLinkIcon className="size-4 mr-2" />
                    Open in new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}