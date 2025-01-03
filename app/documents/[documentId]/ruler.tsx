"use client"
import { useMutation } from "@liveblocks/react/suspense";
import { useStorage } from "@liveblocks/react/suspense";


export default function Ruler() {
    const left = useStorage((root) => root.leftPadding)
    const changeLeftPadding = useMutation(({ storage }, newPadding: number) => {
        storage.set("leftPadding", newPadding);
    }, []);

    const handleLeftMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.buttons === 1) {
            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
            if (rect) {
                const newPos = Math.max(0, Math.min(816, e.clientX - rect.left));
                changeLeftPadding(newPos);
            }
        }
    }

    const right = useStorage((root) => root.rightPadding)
    const changeRightPadding = useMutation(({ storage }, newPadding: number) => {
        storage.set("rightPadding", newPadding);
    }, []);
    const handleRightMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.buttons === 1) {
            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
            if (rect) {
                const newPos = Math.max(0, Math.min(816, e.clientX - rect.left));
                changeRightPadding(newPos);
            }
        }
    }

    return (
        <div className="h-10 flex items-start w-[calc(min(100%,816px))] mx-auto relative">
            <div className="absolute bottom-0 w-full border-t border-gray-400">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="absolute" style={{ left: `${(i) * 100}px` }}>
                        <div className="relative h-2 w-px bg-gray-400 -translate-y-2">
                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-600">
                                {i + 1}
                            </span>
                        </div>
                    </div>
                ))}

                {[...Array(82)].map((_, i) => (
                    <div key={i} className="absolute" style={{ left: `${(i) * 10}px` }}>
                        <div className="relative h-1 w-px bg-gray-400 -translate-y-1" />
                    </div>
                ))}
                {/* 游标尺寸调价到计算 */}
                <button
                    className="group absolute cursor-ew-resize z-50"
                    style={{ left: left, transform: 'translateX(-50%)' }}
                    onMouseMove={handleLeftMove}
                >
                    <div className="w-0 h-0 border-t-[8px] border-l-[6px] border-r-[6px] border-t-blue-500 border-transparent -translate-y-3 hover:border-t-blue-600 transition-colors" />
                    <div className="invisible group-active:visible w-[1px] h-[1054px] bg-blue-500 absolute top-0 left-[5px]" />
                </button>
                {/* 右侧游标 */}
                <button 
                    className="group absolute cursor-ew-resize z-50" 
                    style={{ right:right, transform: 'translateX(50%)'}}
                    onMouseMove={handleRightMove}
                >
                    <div className="w-0 h-0 border-t-[8px] border-l-[6px] border-r-[6px] border-t-blue-500 border-transparent -translate-y-3 hover:border-t-blue-600 transition-colors" />
                    <div className="invisible group-active:visible w-[1px] h-[1054px] bg-blue-500 absolute top-0 left-[5px]" />
                </button>

            </div>
        </div>
    )
}