"use client"
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { FileIcon, FileJsonIcon, Code2Icon, FileTextIcon, PlusIcon, FilePenIcon, TrashIcon, PrinterIcon, UndoIcon, RedoIcon } from "lucide-react";
import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarTrigger, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarSeparator, MenubarShortcut } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { BsFilePdf } from "react-icons/bs";
export default function Navbar() {
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
                                            <MenubarItem>
                                                <FileJsonIcon className="w-4 h-4 mr-2" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem>
                                                <Code2Icon className="w-4 h-4 mr-2" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem>
                                                <BsFilePdf className="w-4 h-4 mr-2" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem>
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
                                        Print <MenubarShortcut className="ml-auto">Ctrl+P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <UndoIcon className="w-4 h-4 mr-2" />
                                        Undo
                                    </MenubarItem>
                                    <MenubarItem>
                                        <RedoIcon className="w-4 h-4 mr-2" />
                                        Redo
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Bold
                                    </MenubarItem>
                                    <MenubarItem>
                                        Italic
                                    </MenubarItem>
                                    <MenubarItem>
                                        Underline
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Bold
                                    </MenubarItem>
                                    <MenubarItem>
                                        Italic
                                    </MenubarItem>
                                    <MenubarItem>
                                        Underline
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav>
    )
}