export default function Ruler() {
    return (
        <div className="relative  w-full   border-b border-neutral-200 ">
            <div className="absolute left-[56px] right-[56px] h-full flex max-w-[850px] mx-auto">
                {Array.from({ length: 85 }).map((_, i) => (
                    <div key={i} className="flex-1 relative">
                        <div className="absolute h-[8px] w-px bg-neutral-300 bottom-0" style={{ left: '50%' }}></div>
                        {i % 10 === 0 && (
                            <>
                                <div className="absolute h-[12px] w-px bg-neutral-400 bottom-0" style={{ left: '50%' }}></div>
                                <div className="absolute bottom-[14px] text-[5px] text-neutral-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                                    {i}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}