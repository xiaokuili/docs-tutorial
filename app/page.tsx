"use client"
import Navbar from "./navbar"
import DocumentTable from "./document-table"
import DocumentTemplate from "./document-template"
import { usePaginatedQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.getDocuments,
    {},
    { initialNumItems: 5 },
  );
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="mt-16">
        <DocumentTemplate />
        <DocumentTable documents={results} status={status} loadMore={loadMore} />
      </div>
    </div>                                                                                                                                                              
  )
}


