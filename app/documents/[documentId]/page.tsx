"use client"
import Editor from "./editor";
import Toolbar from "./toolbar"
import Navbar from "./navbar"
import Ruler from "./ruler"

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <div className="sticky top-0 z-50 print:hidden">
            <Navbar/>
            <Toolbar/>
        </div>
   
      <div className="flex-1 overflow-y-auto print:overflow-visible">
        <Ruler/>
        <Editor />
      </div>
    </div>
  );
}


