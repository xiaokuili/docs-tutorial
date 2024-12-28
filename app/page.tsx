"use client"
import Editor from "./documents/[documentId]/editor"
import Navbar from "./navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        
        <Editor />

    </div>
  );
}
