"use client"
import { Preloaded, usePreloadedQuery } from 'convex/react';
import Editor from './editor'
import Toolbar from './toolbar'
import Ruler from './ruler'
import Navbar from './navbar'
import { Room } from './room';
import { api } from '@/convex/_generated/api';

type Props = {
   preloadedDocument: Preloaded<typeof api.documents.getById>
};

export default  function Document({ preloadedDocument }: Props) {
    const document = usePreloadedQuery(preloadedDocument)
    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFB]">
                <div className="flex flex-col px-4 pt-2 gap-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFB] print:hidden">
                    <Navbar data={document }/>
                    <Toolbar />
                </div>
                <div className="size-full overflow-y-auto bg-[#F9FBFD] px-4 pirnt:p-0 print:bg-white print: overflow-y-auto pt-32 print:pt-0">
                    <Ruler />
                    <div className="flex justify-center max-w-[816px] py-4 print:py-0 mx-auto ">

                        <Editor initialContent={document.initialContent || ""} />

                    </div>
                </div>
            </div>
        </Room>
    );

}