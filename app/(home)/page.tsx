"use client"
import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentTable from "./document-table";
import { usePaginatedQuery } from "convex/react";


export default function Home() {
  const { results, loadMore, status } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 },
  );
  console.log(results);

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

