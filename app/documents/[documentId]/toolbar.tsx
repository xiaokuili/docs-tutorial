"use client"
import { 
    Undo, 
    Redo, 
    Printer, 
    LucideIcon, 
    ChevronDown, 
    Plus, 
    Minus, 
    Bold, 
    Italic, 
    Underline, 
    HighlighterIcon, 
    LinkIcon, 
    ImageIcon, 
    AlignLeftIcon, 
    AlignCenterIcon, 
    AlignRightIcon, 
    AlignJustifyIcon, 
    ListOrderedIcon, 
    ListIcon,
    ListChecks,
    MessageSquare
} from "lucide-react"
import { LineHeightIcon } from '@radix-ui/react-icons'


import { cn } from "@/lib/utils"
import { CirclePicker, TwitterPicker } from "react-color"
import { Level } from "@tiptap/extension-heading"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useEditorStore } from "@/hook/use-editor"
import { useState } from "react"
    
interface ToolbarButtonProps {
    Icon: LucideIcon            
    onClick: () => void
    isActive: boolean
}

const ToolbarButton = ({ Icon, onClick, isActive }: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                " h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200  px-1.5 overflow-hidden text-sm",
                isActive && "bg-neutral-200"
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}



export default function Toolbar() {
    const { editor } = useEditorStore()
    const items = [
        [
            {
                icon: Undo,
                onClick: () => { editor?.chain().focus().undo().run() },
                isActive: false
            },
            {
                icon: Redo,
                onClick: () => { editor?.chain().focus().redo().run() },
                isActive: false
            },
            {
                icon: Printer,
                onClick: () => { window.print() },
                isActive: false
            }
        ],
        [
            {
                icon: Bold,
                onClick: () => { editor?.chain().focus().toggleBold().run() },
                isActive: editor?.isActive('bold') || false
            },
            {
                icon: Italic,
                onClick: () => { editor?.chain().focus().toggleItalic().run() },
                isActive: editor?.isActive('italic') || false
            },
            {
                icon: Underline,
                onClick: () => { editor?.chain().focus().toggleUnderline().run() },
                isActive: editor?.isActive('underline') || false
            }
        ],
        
    ]

    return (
        <div className="bg-neutral-50 px-2.5 py-0.5  min-h-[40px] flex items-center overflow-auto gap-1">
            {items[0].map((item, index) => (
                <ToolbarButton key={index} Icon={item.icon} onClick={item.onClick} isActive={item.isActive} />
            ))}

            <Separator orientation="vertical" className="mx-1 h-6" />

            <HeadButton />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <FontSizeButton />
            <Separator orientation="vertical" className="mx-1 h-6" />
            {items[1].map((item, index) => (
                <ToolbarButton key={index} Icon={item.icon} onClick={item.onClick} isActive={item.isActive} />
            ))}

            <Separator orientation="vertical" className="mx-1 h-6" />
            <ColorButton />
            <HighlightButton />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <LinkButton />
            <ImageButton />
            <Separator orientation="vertical" className="mx-1 h-6" />
            <AlignButton />
            <ListButton />
            <ToolbarButton key="tasklist" Icon={ListChecks} onClick={() => editor?.chain().focus().toggleTaskList().run()} isActive={editor?.isActive('taskList') || false} />

            <LineHeightButton />
            <CommentButton />
           
        </div>
    )
}


function HeadButton() {
    const { editor } = useEditorStore()
    const headItems = [
        { label: "h1", style: "text-2xl font-bold", level: 1 },
        { label: "h2", style: "text-xl font-bold", level: 2 },
        { label: "h3", style: "text-lg font-bold", level: 3 },
    ]
    const current = headItems.find(item => editor?.isActive('heading', { level: item.level })) || { label: "h1", style: "text-sm", level: 0 }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className=" text-sm h-7 w-20  shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <span className="text-sm">{current?.label || "NORMAL"}</span>
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-1">
                {headItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: item.level as Level }).run()}
                        className={cn(
                            "cursor-pointer w-full text-left px-2 py-1 rounded-sm",
                            current?.level === item.level && "bg-neutral-200"
                        )}
                    >
                        <span className={item.style}>{item.label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function FontFamilyButton() {
    const { editor } = useEditorStore();

    const fontFamilys: { label: string, value: string }[] = [
        { label: 'Inter', value: 'Inter' },
        { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
        { label: 'Serif', value: 'serif' },
        { label: 'Monospace', value: 'monospace' },
        { label: 'Cursive', value: 'cursive' },
        { label: 'Title Font', value: 'var(--title-font-family)' },
        { label: 'Exo 2', value: 'Exo 2' }
    ]
    const currentFontFamily = fontFamilys.find(font => editor?.isActive('textStyle', { fontFamily: font.value }))?.label || 'Arial';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className=" text-sm h-7 w-20  shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
                    <span className="text-xs">{currentFontFamily.length > 5 ? currentFontFamily.slice(0, 5) + '...' : currentFontFamily}</span>
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="p-1 flex flex-col gap-1"
            >
                {fontFamilys.map(({ label, value }) => (
                    <button
                        key={value}
                        value={value}
                        className={cn("flex items-center  px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes('textStyle').fontFamily === value && "bg-neutral-200/80")}
                        style={{ fontFamily: value }}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    );
}


function FontSizeButton() {
    const { editor } = useEditorStore()
    const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 88, 96]
    const fontSize = Number(editor?.getAttributes('textStyle').fontSize?.replace('px', '') || '16')

    return (
        <div className="flex items-center gap-0.5">
            <button
                onClick={() => editor?.chain().focus().setFontSize(String(fontSize - 1) + 'px').run()}
                className="text-sm h-6 min-w-6 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
            >
                <Minus className="h-4 w-4 text-neutral-600" />
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="text-sm h-6 min-w-8 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden border border-neutral-300">
                        <span >{fontSize}</span>
                    </button>


                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-8 p-1 flex flex-col gap-0.5">
                    {fontSizes.map((size, index) => (
                        <button
                            key={index}
                            onClick={() => editor?.chain().focus().setFontSize(String(size) + 'px').run()}
                            className={cn(
                                "h-6 flex items-center justify-center px-2",
                                "rounded-sm hover:bg-neutral-200/80",
                                "text-xs",
                                editor?.getAttributes('textStyle').fontSize === `${size}px` && "bg-neutral-200/80"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <button
                onClick={() => editor?.chain().focus().setFontSize(String(fontSize + 1) + 'px').run()}
                className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
            >
                <Plus className="h-4 w-4 text-neutral-600" />
            </button>
        </div>
    )
}


function ColorButton() {
    const { editor } = useEditorStore()
    const currentColor = editor?.getAttributes('textStyle').color || '#000000'
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <span className="text-xs">A</span>
                    <div
                        className="w-4 h-0.5 rounded-sm"
                        style={{ backgroundColor: currentColor }}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2">
                <CirclePicker
                    color={currentColor}
                    onChange={(color) => editor?.chain().focus().setColor(color.hex).run()}
                    colors={[
                        '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc',
                        '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
                        '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff',
                        '#4a86e8', '#0000ff', '#9900ff', '#ff00ff'
                    ]}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function HighlightButton() {
    const { editor } = useEditorStore()
    const currentColor = editor?.getAttributes('highlight').color || '#000000'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <HighlighterIcon
                        className="size-4"
                        style={{ color: currentColor === 'transparent' ? 'currentColor' : currentColor }}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2">
                <TwitterPicker
                    color={currentColor}
                    onChange={(color) => editor?.chain().focus().setHighlight({ color: color.hex }).run()}
                    colors={[
                        '#fff176', '#81c784', '#64b5f6', '#e57373',
                        '#ba68c8', '#4db6ac', '#ff8a65', '#f06292'
                    ]}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function LinkButton() {
    const { editor } = useEditorStore()
    const [link, setLink] = useState(editor?.getAttributes('link').href || '')


    return (
        <DropdownMenu onOpenChange={() => {
            setLink(editor?.getAttributes('link').href || '')
        }}>

            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <LinkIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2 flex gap-2">
                <Input
                    type="url"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    autoFocus
                />
                <Button
                    onClick={() => {
                        if (link === '') {
                            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
                            return
                        }
                        editor?.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
                        setLink('')
                    }}
                    className="w-16"
                >
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ImageButton() {
    const { editor } = useEditorStore()
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [url, setUrl] = useState('')
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <ImageIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-1">
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm cursor-pointer">
                        <ImageIcon className="size-4" />
                        <span className="text-sm">Upload Image</span>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        const imageUrl = e.target?.result as string
                                        editor?.chain().focus().setImage({ src: imageUrl }).run()
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }}
                        />
                    </label>

                    <button
                        className="flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm"
                        onClick={() => setShowImageDialog(true)}
                    >
                        <LinkIcon className="size-4" />
                        <span className="text-sm">Image URL</span>
                    </button>

                </div>
                <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Image URL</DialogTitle>

                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-2">
                            <Input type="url" placeholder="https://example.com" className="col-span-2" value={url} onChange={(e) => setUrl(e.target.value)} />
                            <Button
                                className="col-span-1"
                                onClick={() => {
                                    editor?.chain().focus().setImage({ src: url }).run()
                                    setShowImageDialog(false)
                                    setUrl('')
                                }}>
                                    Apply
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AlignButton() {
    const { editor } = useEditorStore()
    const alignItems = [
        { icon: AlignLeftIcon, label: 'Left', value: 'left' },
        { icon: AlignCenterIcon, label: 'Center', value: 'center' },
        { icon: AlignRightIcon, label: 'Right', value: 'right' },
        { icon: AlignJustifyIcon, label: 'Justify', value: 'justify' },
    ]
    const currentAlign = alignItems.find(item => editor?.isActive({ textAlign: item.value })) || alignItems[0]
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1">
                {alignItems.map((item, index) => (
                    <button 
                        key={index}
                        className={cn(
                            "flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm",
                            currentAlign.value === item.value && "bg-neutral-200/80"
                        )}
                        onClick={() => editor?.chain().focus().setTextAlign(item.value).run()}
                    >
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ListButton() {
    const { editor } = useEditorStore()
    const listItems = [
        { icon: ListIcon, label: 'Bullet List', value: 'bullet' },
        { icon: ListOrderedIcon, label: 'Ordered List', value: 'ordered' }
    ]
    const currentList = listItems.find(item => editor?.isActive(item.value + 'List')) || {value: ""}

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1">
                {listItems.map((item, index) => (
                    <button 
                        key={index}
                        className={cn(
                            "flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm",
                            currentList?.value === item.value && "bg-neutral-200/80"
                        )}
                        onClick={() => {
                            if(item.value === 'bullet') {
                                editor?.chain().focus().toggleBulletList().run()
                            } else {
                                editor?.chain().focus().toggleOrderedList().run()
                            }
                        }}
                    >
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


function LineHeightButton() {
    const { editor } = useEditorStore()
    const lineHeights = [1, 1.5, 2, 2.5, 3, 3.5, 4]

    const currentLineHeight = lineHeights.find(height => 
        editor?.isActive('textStyle', { lineHeight: String(height) })
    ) || lineHeights[0]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                    <LineHeightIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="flex flex-col gap-1 min-w-8">
                {lineHeights.map((item, index) => (
                    <button
                        key={index}
                        className={cn("flex items-center gap-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm", currentLineHeight === item && "bg-neutral-200/80")}
                        onClick={() => editor?.chain().focus().setLineHeight(String(item)).run()}
                    >
                        <span className="text-sm">{item}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function CommentButton() {
    return (
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
            <MessageSquare className="size-4" />
        </button>
    )
}

