"use server"
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Document from "./document";

export  default async function Page({params}: {params: {documentId: string}}) {
  const { documentId } = await params;

  const preloadedTasks = await preloadQuery(api.document.getById, {
    documentId: documentId as Id<"documents">,
  });

  return (
    <Document preloadedTasks={preloadedTasks} />
  );
}


