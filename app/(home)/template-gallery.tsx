"use client"

import { cn } from "@/lib/utils"
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { templates } from "./constants/templates"
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner"

export default function TemplateGallery() {
    const router = useRouter();
    const create = useMutation(api.documents.create);

    const [isCreateing, setIsCreateing] = useState(false);

    const handleTemplateClick = async ({ title, initialContent }: { title: string, initialContent: string }) => {
        setIsCreateing(true);
        const documentId = await create({
            title,
            initialContent,
        }).catch(() => {
            toast.error("Failed to create document. Please try again.")
        });
        router.push(`/documents/${documentId}`);
    }
    return <div className="bg-[#F1F3F4]">
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
            <h3 className='font-medium '>Start a new document</h3>
            <Carousel>
                <CarouselContent className="-ml-4 ">
                    {templates.map((template) => (
                        <CarouselItem key={template.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 pl-4">
                            <div className={cn("aspect-[3/4] flex flex-col gap-y-2.5", isCreateing && "pointer-events-none opacity-50")}>

                                <button
                                    disabled={isCreateing}
                                    // TODO: Add initial content here
                                    onClick={() => handleTemplateClick(
                                        {
                                            title: template.label,
                                            initialContent: "",
                                        }
                                    )}
                                    style={{
                                        backgroundImage: `url(${template.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                                >

                                </button>
                                <p className="text-sm font-medium truncate ">
                                    {template.label}
                                </p>
                            </div>

                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


        </div>
    </div >
}