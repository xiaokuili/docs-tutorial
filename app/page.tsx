"use client"
import Link from "next/link"  
export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <Link href="/documents/1" className="block p-4 hover:bg-neutral-100 rounded-lg">
          Click to open document
        </Link>
      </div>
    </div>
  )
}
