import { Doc } from "@/convex/_generated/dataModel";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Building2, ExternalLinkIcon, MoreVerticalIcon, PencilIcon, Trash2Icon, User } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";  // si 代表 Simple Icons
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentTableProps {
    documents: Doc<"documents">[],
    status: string
    loadMore: (numItems: number) => void

}

export default function DocumentTable({ documents, status, loadMore }: DocumentTableProps) {

    console.log(status)
    return <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5 ">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>&nbsp;</TableHead>
                    <TableHead className="hidden md:table-cell">Shared</TableHead>
                    <TableHead className="hidden md:table-cell">Created At</TableHead>
                </TableRow>

            </TableHeader>
            <TableBody>
                {documents?.map((document) => (
                    <DocumentRow key={document._id} document={document} />
                ))}
            </TableBody>
        </Table>

        {status === "CanLoadMore" && (
            <button
                onClick={() => loadMore(5)}
                className="mx-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
                Load more documents
            </button>
        )}
        {status === "LoadingMore" && (
            <div className="mx-auto text-sm text-gray-500 py-2">
                Loading...
            </div>
        )}
    </div>
}


function DocumentRow({ document }: { document: Doc<"documents"> }) {
    if (!document) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">
                    No document
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow>
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell>
                <span className="text-sm font-medium">{document.title}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2 text-muted-foreground">
                    {document.orgId ? (
                        <>
                            <Building2 className="w-4 h-4" />
                            <span>Organization</span>
                        </>
                    ) : (
                        <>
                            <User className="w-4 h-4" />
                            <span>Personal</span>
                        </>
                    )}
                </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground">
                {new Date(document.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVerticalIcon className="w-4 h-4 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2Icon className="w-4 h-4 mr-2" />
                            Remove
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ExternalLinkIcon className="w-4 h-4 mr-2" />
                            Open in new tab
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
