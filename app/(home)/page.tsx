"use client"
import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentTable from "./document-table";
import { useSearchParam } from "@/hook/use-search-param";

export default function Home() {
  const [search] = useSearchParam("search")
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,  
    {search},
    { initialNumItems: 5 },
  );

  return (
    <div className="flex min-h-screen flex-col">

      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentTable documents={results} loadMore={loadMore} status={status} />
      </div>
    </div>
  );
}

