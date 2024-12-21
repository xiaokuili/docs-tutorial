import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table";
import { Underdog } from "next/font/google";
import { LoaderIcon } from "lucide-react";
import DocumentRow from "./document-row";
import { Button } from "@/components/ui/button";
interface DocumentTableProps {
    documents: Doc<"documents">[],
    loadMore: () => void,
    status: PaginationStatus
}


export default function DocumentTable({ documents, loadMore, status }: DocumentTableProps) {
    return <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
        {documents === undefined ?

            <div className="flex flex-col justify-center items-center h-24"> <LoaderIcon className="animate-spin text-muted-foreground size-5" /></div> :
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none ">
                        <TableHead>Title</TableHead>
                        <TableHead>&nbsp;</TableHead>
                        <TableHead className="hidden md:table-cell">Shared</TableHead>
                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                    </TableRow>
                </TableHeader>

                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">No documents found</TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {documents.map((document) => (
                            <DocumentRow key={document._id} document={document} />
                        ))}
                    </TableBody>
                )}



            </Table>
        }
        <div className="flex justify-center items-center">
            <Button variant="ghost" size="sm" onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>{status === "CanLoadMore" ? "Load More" : "End of results"}</Button>
        </div>
    </div>
}
