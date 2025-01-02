"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import FullScreenLoading   from "@/components/fullscreen-loading"
import { toast } from "sonner"
import { useState } from "react"

export default function DocumentTemplate() {
  const templates = [
    { label: "Blank Document", url: "blank-document.svg" },
    { label: "Resume", url: "resume.svg" },
    { label: "Business Letter", url: "business-letter.svg" },
    { label: "Cover Letter", url: "cover-letter.svg" },
    { label: "Letter", url: "letter.svg" },
    { label: "Project Proposal", url: "project-proposal.svg" },
    { label: "Software Proposal", url: "software-proposal.svg" },
  ]
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const create = useMutation(api.document.create)

  const handleClick = async (title: string) => {
    setIsLoading(true)
    try {
      // 先创建文档并获取返回的 ID
      const documentId = await create({
        title: title,
        initialContent: "asdf", 
      })
      
      toast.success("Document created successfully")
      // 使用返回的文档 ID 进行跳转
      router.push(`/documents/${documentId}`)
    } catch (error) {
      toast.error("Failed to create document")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return isLoading ? <FullScreenLoading message="Creating document..." /> : (
    <div className="bg-neutral-100 py-4">
      <div className="max-w-screen-xl mx-auto gap-4 flex flex-col px-16">
        <h1 className="text-lg font-medium text-left text-gray-800">Start with a template</h1>
        <Carousel>
          <CarouselContent>
            {templates.map((template) => (
              <CarouselItem key={template.label} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 pl-4">
                <button onClick={() => handleClick(template.label)} className="cursor-pointer hover:opacity-80 transition-opacity text-left flex flex-col gap-2">
                  <Image
                    src={template.url}
                    alt={template.label}
                    width={200}
                    height={259}
                    className="border rounded-lg"
                    priority
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  )
}
