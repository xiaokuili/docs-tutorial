
import Editor from './editor'
import Toolbar from './toolbar'
import Ruler from './ruler'

type Props = {
    params: {
        documentId: string;
    };
};

export default async function DocumentPage({ params }: Props) {
    const { documentId } = await params
    console.log(documentId)
    return (
        <div className="h-screen flex flex-col">
            {/* 固定在顶部的工具栏 */}
            <Toolbar />

            {/* 文档编辑区域 */}
            <div className="size-full overflow-y-auto bg-[#F9FBFD] px-4 pirnt:p-0 print:bg-white print: overflow-y-auto">
                {/* <div className="flex-1 overflow-y-auto bg-gray-50 pt- space-y-5"> */}

                <Ruler />

                {/* <div className="max-w-[850px] mx-auto h-full px-6 pb-20"> */}
                <div className="flex justify-center max-w-[816px] py-4 print:py-0 mx-auto ">
                    <Editor />
                </div>
            </div>
        </div>
    );
}