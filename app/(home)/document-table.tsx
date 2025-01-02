"use client"
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
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DocumentTableProps {
    documents: Doc<"documents">[],
    status: string
    loadMore: (numItems: number) => void

}

export default function DocumentTable({ documents, status, loadMore }: DocumentTableProps) {
    
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
                {(documents?.length === 0  && status != "LoadingFirstPage") && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400">No document</TableCell>
                    </TableRow>
                )}
                {documents?.map((document) => (
                    <DocumentRow key={document._id} document={document} />
                ))}
            </TableBody>
        </Table>
        {/* TODO: 这里基于当前数据是否填满来判断的，可能存在问题 */}
        {status === "CanLoadMore" && (
            <button
                onClick={() => loadMore(5)}
                className="mx-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
                Load more documents
            </button>
        )}
        {(status === "LoadingFirstPage" || status === "LoadingMore") && (
            <div className="mx-auto text-sm text-gray-500 py-2">
                Loading...
            </div>
        )}
    </div>
}


function DocumentRow({ document }: { document: Doc<"documents"> }) {

    const router = useRouter()
    const removeByID= useMutation(api.document.removeByID)



    return (
        <TableRow key={document._id} onClick={() => router.push(`/documents/${document._id}`)} className="cursor-pointer hover:bg-gray-100">
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell>
                <span className="text-sm font-medium">{document.title}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2 text-muted-foreground">
                    {document.organizationId !== "undefined" ? (
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
                {new Date(document._creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })}
            </TableCell>
            <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVerticalIcon className="w-4 h-4 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await removeByID({ id: document._id });
                                toast.success("Document removed successfully");
                            } catch (error) {
                                toast.error("Failed to remove document");
                                console.error(error);
                            }
                           
                        }}>
                            <Trash2Icon className="w-4 h-4 mr-2" />
                            Remove
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e)=> {
                                e.stopPropagation();
                                window.open(`/documents/${document._id}`, '_blank');
                            }}>
                            <ExternalLinkIcon className="w-4 h-4 mr-2" />
                            Open in new tab
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
