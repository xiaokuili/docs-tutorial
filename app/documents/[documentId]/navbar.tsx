"use client"
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { FileIcon, FileJsonIcon, Code2Icon, FileTextIcon, PlusIcon, FilePenIcon, TrashIcon, PrinterIcon, UndoIcon, RedoIcon, TextIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, RemoveFormattingIcon } from "lucide-react";
import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarTrigger, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarSeparator, MenubarShortcut } from "@/components/ui/menubar";
import { BsFilePdf } from "react-icons/bs";
import { useEditor } from "@/hook/use-editor";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";

export default function Navbar() {
    const { editor } = useEditor()

    const insertTable = (rows: number, cols: number) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
    }
   
    const onDownload = (blob:Blob, fileName:string) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
    }

    const SaveAsJson = () => {
        const json = editor?.getJSON()
        const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
        onDownload(blob, 'document.json')
    }

    const SaveAsHtml = () => {
        const html = editor?.getHTML()
        const blob = new Blob([html || ''], { type: 'text/html' })
        onDownload(blob, 'document.html')
    }

    const SaveAsText = () => {
        const text = editor?.getText()
        const blob = new Blob([text || ''], { type: 'text/plain' })
        onDownload(blob, 'document.txt')
    }

 

    return (
        <nav className='flex items-center justify-between '>
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={36} height={36} />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput />
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="w-4 h-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={SaveAsJson}>
                                                <FileJsonIcon className="w-4 h-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={SaveAsHtml}>
                                                <Code2Icon className="w-4 h-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="w-4 h-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={SaveAsText}>
                                                <FileTextIcon className="w-4 h-4 mr-2" />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>

                                    </MenubarSub>
                                    <MenubarItem>
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <FilePenIcon className="w-4 h-4 mr-2" />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <TrashIcon className="w-4 h-4 mr-2" />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => {
                                        window.print();
                                    }}>
                                        <PrinterIcon className="w-4 h-4 mr-2" />
                                        Print <MenubarShortcut className="ml-auto">⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <UndoIcon className="w-4 h-4 mr-2" />
                                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <RedoIcon className="w-4 h-4 mr-2" />
                                        Redo <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable(1, 1)}>1 x 1</MenubarItem>
                                            <MenubarItem onClick={() => insertTable(2, 2)}>2 x 2</MenubarItem>
                                            <MenubarItem onClick={() => insertTable(3, 3)}>3 x 3</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="w-4 h-4 mr-2" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="w-4 h-4 mr-2" />
                                                Bold <MenubarShortcut>⌘B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="w-4 h-4 mr-2" />
                                                Italic <MenubarShortcut>⌘I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="w-4 h-4 mr-2" />
                                                Underline <MenubarShortcut>⌘U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="w-4 h-4 mr-2" />
                                                Strikethrough &nbsp; <MenubarShortcut>⌘S</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="w-4 h-4 mr-2" />
                                        Clear formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>

                
            </div>
            <div className="flex items-center gap-2">
                    <Avatars />
                    <Inbox />
                    <OrganizationSwitcher 
                        afterCreateOrganizationUrl="/"
                        afterLeaveOrganizationUrl="/"
                        afterSelectOrganizationUrl="/"
                        afterSelectPersonalUrl="/"
                    />
                    <UserButton  />
                    
                    
                </div>
        </nav>
    )
}