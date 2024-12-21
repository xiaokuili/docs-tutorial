import { Doc } from "@/convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, UserCircleIcon } from "lucide-react";
import { format } from "date-fns";
import DocumentMenu from "./document-menu";
import { useRouter } from "next/navigation";
interface DocumentRowProps {
    document: Doc<"documents">;
}

export default function DocumentRow({ document }: DocumentRowProps) {
    const router = useRouter();

    return (
        <TableRow onClick={() => router.push(`/documents/${document._id}`)} className="cursor-pointer">
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId
                    ? <Building2Icon className="size-4" />
                    : <UserCircleIcon className="size-4" />}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell items-center gap-2">
                {format(document._creationTime, "MMM d, yyyy")}
            </TableCell>
            <TableCell className="flex  justify-end">
                <DocumentMenu documentId={document._id} onNewTab={() => window.open(`/documents/${document._id}`, "_blank")} title={document.title} />
            </TableCell>
        </TableRow>
    )

}
