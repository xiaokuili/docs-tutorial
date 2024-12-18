"use client"
import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function Home() {
  const documents = useQuery(api.documents.get);
  if (!documents) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen flex-col">

      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents && documents.map((document) => (
          <div key={document._id}>
            <p>{document.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

