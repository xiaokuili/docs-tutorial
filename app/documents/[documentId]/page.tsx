
import Editor from './editor'
import Toolbar from './toolbar'
import Ruler from './ruler'
import Navbar from './navbar'
import { Room } from './room';

type Props = {
    params: {
        documentId: string;
    };
};

export default async function DocumentPage({ params }: Props) {
    const { documentId } = await params
    console.log(documentId)
    throw new Error("oops")
    return (
        <div className="min-h-screen bg-[#FAFBFB]">
            <div className="flex flex-col px-4 pt-2 gap-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFB] print:hidden">
                <Navbar />
                <Toolbar />
            </div>
            <div className="size-full overflow-y-auto bg-[#F9FBFD] px-4 pirnt:p-0 print:bg-white print: overflow-y-auto pt-32 print:pt-0">
                <Ruler />
                <div className="flex justify-center max-w-[816px] py-4 print:py-0 mx-auto ">
                    <Room>
                        <Editor />
                    </Room>
                </div>
            </div>
        </div>
    );
}