'use client'

export default function Toolbar() {
  return (
    <div className="border border-input bg-transparent rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-1">
        <span className="px-2 py-1">Bold</span>
        <span className="px-2 py-1">Italic</span>
        <span className="px-2 py-1">Strikethrough</span>
        <span className="h-4 mx-2 border-l border-gray-300" />
        <span className="px-2 py-1">Bullet List</span>
        <span className="px-2 py-1">Numbered List</span>
        <span className="h-4 mx-2 border-l border-gray-300" />
        <span className="px-2 py-1">Align Left</span>
        <span className="px-2 py-1">Center</span>
        <span className="px-2 py-1">Align Right</span>
      </div>
    </div>
  )
}


