
import Editor from './editor'
import Toolbar from './toolbar'

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
        <div className="bg-gray-50/80 relative z-[5] shadow-sm backdrop-blur-sm">
            <div className="max-w-screen-2xl mx-auto px-6 py-2">
                <Toolbar />
            </div>
        </div>

        {/* 文档编辑区域 */}
        <div className="flex-1 overflow-y-auto bg-gray-100 pt-10">
            <div className="max-w-[850px] mx-auto h-full px-6 pb-20">
                <div className="bg-white rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[1056px] w-full relative z-10">
                    <Editor />
                </div>  
            </div>
            </div>
        </div>
    );
}