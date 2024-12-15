'use client'
import { FaCaretDown } from "react-icons/fa";
import { useRef, useState } from "react";


const markers = Array.from({ length: 83 }, (_, i) => i)

export default function Ruler() {

    const [LeftMargin, setLeftMargin] = useState(56)
    const [RightMargin, setRightMargin] = useState(56)
    const [isDraggingLeft, setIsDraggingLeft] = useState(false)
    const [isDraggingRight, setIsDraggingRight] = useState(false)
    const rulerRef = useRef<HTMLDivElement>(null)

    const handleLeftMouseDown = () => {
        setIsDraggingLeft(true)
    }

    const handleRightMouseDown = () => {
        setIsDraggingRight(true)
    }
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>)  => {
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container')
            if (container) {
                // 1. 获取鼠标在容器内的位置
                const containerRect = container.getBoundingClientRect()
                const mousePosition = e.clientX - containerRect.left

                // 2. 确保鼠标位置在容器范围内 (0 到 816 之间)
                const safePosition = Math.min(Math.max(mousePosition, 0), 816)

                // 3. 最小间距
                const minGap = 100

                if (isDraggingLeft) {
                    // 左边标记：不能超过 (右边标记位置 - minGap)
                    const maxAllowedLeft = 816 - RightMargin - minGap
                    const newLeftMargin = Math.min(safePosition, maxAllowedLeft)
                    setLeftMargin(newLeftMargin)
                } else {
                    // 右边标记：不能超过 (左边标记位置 + minGap)
                    const maxAllowedRight = 816 - (LeftMargin + minGap)
                    const newRightMargin = Math.min(816 - safePosition, maxAllowedRight)
                    setRightMargin(Math.max(newRightMargin, 0))
                }
            }
        }
    }

    const handleMouseUp = () => {
        setIsDraggingLeft(false)
        setIsDraggingRight(false)
    }

    const handleLeftDoubleClick = () => {
        setLeftMargin(56)
    }
    const handleRightDoubleClick = () => {
        setRightMargin(56)
    }
    return (
        <div ref={rulerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="max-w-[816px] mx-auto  h-6 border-b border-gray-300  items-end relative select-none ">
            <div id="ruler-container" className="w-full h-full relative print:hidden">
                <Marker position={LeftMargin} isLeft={true} isDragging={isDraggingLeft} onMouseDown={handleLeftMouseDown} onDoubleClick={handleLeftDoubleClick} />
                <Marker position={RightMargin} isLeft={false} isDragging={isDraggingRight} onMouseDown={handleRightMouseDown} onDoubleClick={handleRightDoubleClick} />

                <div className='absolute inset-x-0 bottom-0 h-full'>
                    <div className="relative h-full w-[816px]">
                        {markers.map((marker) => {
                            const position = (marker * 816) / 82;
                            return (
                                <div key={marker} className="absolute  bottom-0" style={{ left: `${position}px` }}>

                                    {marker % 10 === 0 && (
                                        <>
                                            <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500"></div>
                                            <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">{marker / 10 + 1}</span>
                                        </>
                                    )}
                                    {marker % 5 === 0 && (
                                        <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500"></div>
                                    )}
                                    {marker % 5 != 0 && (
                                        <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500"></div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
    return (
        <div className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
            style={{ [isLeft ? "left" : "right"]: `${position}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}>
            <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />

            {isDragging && (
                <div className="absolute left-1/2 top-4 -translate-x-1/2 transition-opacity duration-150 h-screen w-[1px] scale-x-50 bg-blue-500 z-30">
                </div>
            )}
        </div >
    )
}