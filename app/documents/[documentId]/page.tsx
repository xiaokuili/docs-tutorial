"use client"
import Editor from "./editor";
import Toolbar from "./toolbar"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Toolbar/>
      <Editor />
    </div>
  );
}


