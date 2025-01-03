"use client"

import { Room } from "./room";
import Navbar from "./navbar"
import Toolbar from "./toolbar"
import Ruler from "./ruler"
import Editor from "./editor"
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export  default function Document(props: {
    preloadedTasks: Preloaded<typeof api.document.getById>;
  }) {
    const document = usePreloadedQuery(props.preloadedTasks);


    return (<div className="flex flex-col h-screen bg-gray-100">
        <Room>
            <div className="sticky top-0 z-50 print:hidden">
                <Navbar />
                <Toolbar />
            </div>

            <div className="flex-1 overflow-y-auto print:overflow-visible">

                <Ruler />
                <Editor initialContent={document.initialContent || ""} />
            </div>
        </Room>
    </div>)

}


