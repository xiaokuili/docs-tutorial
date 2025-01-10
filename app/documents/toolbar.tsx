"use client"
import { Undo, Redo, Printer, ChevronDown, Plus, Minus, Bold, Italic, Underline, Highlighter, Link } from 'lucide-react'
import useEditorStore from '@/hook/useEditor'
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {  useState } from 'react'
import { cn } from '@/lib/utils'
import { TwitterPicker } from '@hello-pangea/color-picker'

export default function Toolbar() {
  const { editor } = useEditorStore()

  const undoRedoTools: {
    onClick: () => void
    icon: React.ReactNode
    isActive: boolean
  }[] = [
      {
        onClick: () => editor?.chain().focus().undo().run(),
        icon: <Undo className="w-4 h-4" />,
        isActive: false
      },
      {
        onClick: () => editor?.chain().focus().redo().run(),
        icon: <Redo className="w-4 h-4" />,
        isActive: false
      },
      {
        onClick: () => {
          if (editor) {
            window.print();
          }
        },
        icon: <Printer className="w-4 h-4" />,
        isActive: false
      }
    ]

  const textFormatTools: {
    onClick: () => void
    icon: React.ReactNode
    isActive: boolean
  }[] = [
      {
        onClick: () => editor?.chain().focus().toggleBold().run(),
        icon: <Bold className="w-4 h-4" />,
        isActive: editor?.isActive('bold') ?? false
      },
      {
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        icon: <Italic className="w-4 h-4" />,
        isActive: editor?.isActive('italic') ?? false
      },
      {
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        icon: <Underline className="w-4 h-4" />,
        isActive: editor?.isActive('underline') ?? false
      }
    ]
  return (
    <div className="flex items-center gap-1 px-3 h-10 bg-blue-50/80 dark:bg-neutral-800/90 shadow-sm rounded-xl mx-4">
      {undoRedoTools.map((tool, index) => (
        <button key={index} onClick={tool.onClick} className="flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
          {tool.icon}
        </button>
      ))}
      <Separator orientation="vertical" className="flex items-center h-6" />
      <HeadingButton />
      <Separator orientation="vertical" className="flex items-center h-6" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="flex items-center h-6" />
      <FontSizeButton />
      <Separator orientation="vertical" className="flex items-center h-6" />
      {textFormatTools.map((tool, index) => (
        <button
          key={index}
          onClick={tool.onClick}
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600",
            tool.isActive && "bg-blue-100 dark:bg-neutral-700"
          )}
        >
          {tool.icon}
        </button>
      ))}
      <ColorButton />
      <HighlightButton />
      <Separator orientation="vertical" className="flex items-center h-6" />
      <LinkButton />
      {/* comment */}
      {/* image */}
      <Separator orientation="vertical" className="flex items-center h-6" />
      {/* align */}
      {/* task list */}
      {/* ordered list */}
      {/* unordered list */}

    </div>
  )
}


function HeadingButton() {
  const { editor } = useEditorStore()
  const headings = [
    { label: "Heading 1", value: "1" },
    { label: "Heading 2", value: "2" },
    { label: "Heading 3", value: "3" },
    { label: "Heading 4", value: "4" },
  ]
  const currentHeading = headings.find(heading =>
    editor?.isActive('heading', { level: parseInt(heading.value) })
  )?.label ?? 'Paragraph'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center px-1 justify-center min-w-20 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
          <span className="text-sm font-medium">{currentHeading}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left"
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }}
          >
            <span className="text-lg font-bold">Heading 1</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left"
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }}
          >
            <span className="text-base font-bold">Heading 2</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left"
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
            }}
          >
            <span className="text-sm font-bold">Heading 3</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left"
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 4 }).run();
            }}
          >
            <span className="text-xs font-bold">Heading 4</span>
          </button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FontFamilyButton() {
  const { editor } = useEditorStore()
  const fonts = [
    { label: "Inter", value: "Inter" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "monospace" },
    { label: "Cursive", value: "cursive" },
    { label: "Exo 2", value: "'Exo 2'" }
  ]

  const currentFont = fonts.find(font => {
    const isActive = editor?.isActive('textStyle', { fontFamily: font.value })
    return isActive
  })?.label ?? 'Inter'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex px-1 items-center justify-between w-24 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
          <span className="text-sm font-medium truncate max-w-[80px]">{currentFont}</span>
          <ChevronDown className="w-3 h-3 flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        {fonts.map((font, index) => (
          <DropdownMenuItem key={index} asChild>
            <button
              className="w-full text-left"
              onClick={(e) => {
                e.preventDefault();
                editor?.chain().focus().setFontFamily(font.value).run();
              }}
            >
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </button>
          </DropdownMenuItem>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function FontSizeButton() {
  const { editor } = useEditorStore()
  const fontSizes = [
    { label: "8px", value: "8px" },
    { label: "9px", value: "9px" },
    { label: "10px", value: "10px" },
    { label: "11px", value: "11px" },
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "20px", value: "20px" },
    { label: "24px", value: "24px" },
    { label: "30px", value: "30px" },
    { label: "36px", value: "36px" },
    { label: "48px", value: "48px" },
    { label: "60px", value: "60px" },
    { label: "72px", value: "72px" },
    { label: "96px", value: "96px" },
  ]
  const [currentFontSize, setCurrentFontSize] = useState(editor?.getAttributes('textStyle').fontSize ?? '16px')


  return (
    <div className="flex items-center gap-0">
      <button
        className="flex items-center justify-center w-5 h-5 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600"
        onClick={() => {
          const currentSize = parseInt(currentFontSize);
          const newSize = `${currentSize - 1}px`;
          setCurrentFontSize(newSize);
          editor?.chain().focus().setFontSize(newSize).run();
        }}
      >
        <Minus className="h-4 w-4" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="border border-gray-700 dark:border-neutral-600 flex items-center justify-center min-w-[30px] h-6 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
            <input
              type="text"
              value={currentFontSize.replace('px', '')}
              className="w-5 text-xs font-medium bg-transparent text-center focus:outline-none cursor-default select-none"
              onChange={(e) => {
                const value = e.target.value;
                if (value.match(/^\d*$/)) {
                  editor?.chain().focus().setFontSize(`${value}px`).run();
                }
              }}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => { e.stopPropagation() }}
          onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
          className="min-w-[30px]"
        >
          {fontSizes.map((fontSize, index) => (
            <DropdownMenuItem key={index} asChild>
              <button
                className="w-full flex items-center justify-center px-2"
                onClick={(e) => {
                  e.preventDefault();
                  editor?.chain().focus().setFontSize(fontSize.value).run();
                }}
              >
                {fontSize.label.replace('px', '')}
              </button>
            </DropdownMenuItem>
          ))}

        </DropdownMenuContent>
      </DropdownMenu>
      <button
        className="flex items-center justify-center w-5 h-5 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600"
        onClick={() => {
          const currentSize = parseInt(currentFontSize);
          const newSize = `${currentSize + 1}px`;
          setCurrentFontSize(newSize);
          editor?.chain().focus().setFontSize(newSize).run();
        }}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )

}


function ColorButton() {
  const { editor } = useEditorStore()
  const colors = [
    { label: 'Black', value: '#000000' },
    { label: 'White', value: '#FFFFFF' },
    { label: 'Gray', value: '#6B7280' },
    { label: 'Red', value: '#EF4444' },
    { label: 'Orange', value: '#F97316' },
    { label: 'Yellow', value: '#EAB308' },
    { label: 'Green', value: '#22C55E' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Purple', value: '#A855F7' },
    { label: 'Pink', value: '#EC4899' }
  ]

  const currentColor = colors.find(color =>
    editor?.isActive('textStyle', { color: color.value.toLowerCase() })
  )?.value ?? colors[0].value

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center w-7 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
          <span className="text-sm font-medium">A</span>
          <div className="w-4 h-0.5 rounded-sm" style={{ backgroundColor: currentColor }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        <TwitterPicker
          color={currentColor}
          colors={colors.map(c => c.value)}
          onChange={(color) => {
            editor?.chain().focus().setColor(color.hex).run();
          }}
          triangle="hide"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HighlightButton() {
  const { editor } = useEditorStore()
  const colors = [
    { label: 'Black', value: '#000000' },
    { label: 'White', value: '#FFFFFF' },
    { label: 'Gray', value: '#6B7280' },
    { label: 'Red', value: '#EF4444' },
    { label: 'Orange', value: '#F97316' },
    { label: 'Yellow', value: '#EAB308' },
    { label: 'Green', value: '#22C55E' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Purple', value: '#A855F7' },
    { label: 'Pink', value: '#EC4899' }
  ]

  const currentColor = colors.find(color =>
    editor?.isActive('highlight', { color: color.value.toLowerCase() })
  )?.value ?? colors[0].value

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center w-7 h-7 gap-1 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600">
          <Highlighter className="w-4 h-4" />
          <div className="w-4 h-0.5 rounded-sm" style={{ backgroundColor: currentColor }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        <TwitterPicker
          color={currentColor}
          colors={colors.map(c => c.value)}
          onChange={(color) => {
            editor?.chain().focus().toggleHighlight({ color: color.hex }).run();
          }}
          triangle="hide"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
function LinkButton() {
  const { editor } = useEditorStore()
  const [url, setUrl] = useState(editor?.getAttributes('link').href || '')

  return (
    <DropdownMenu onOpenChange={() => {
      setUrl(editor?.getAttributes('link').href || '')
    }}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-blue-100/80 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 active:bg-blue-200/80 dark:active:bg-neutral-600"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Link className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        onFocus={(e) => { e.preventDefault(); e.stopPropagation() }}
      >
        <div
          className="flex gap-2"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (url) {
                  editor?.chain().focus().setLink({ href: url }).run()
                }
              }
            }}
            onFocus={() => {
              // 当输入框获得焦点时，给选中文本添加高亮
              const selection = editor?.state.selection;
              if (selection && !selection.empty) {
                editor?.chain().setHighlight({ color: 'rgba(59, 130, 246, 0.3)' }).run();
              }
            }}
            onBlur={() => {
              // 当输入框失去焦点时，移除临时高亮
              editor?.commands.unsetMark('highlight');
              editor?.commands.focus();
            }}
            autoFocus 
          />
          <button
            onClick={() => {
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run()
              }
            }}
            className="h-8 px-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
          >
            Insert Link
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
