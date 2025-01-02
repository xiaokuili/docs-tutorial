
import Image from 'next/image'
import { SaveIcon, PencilIcon, TrashIcon, PrinterIcon, FileIcon, UndoIcon, RedoIcon, TableIcon } from 'lucide-react'
import Link from 'next/link'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import DocumentTitle from './document-title'
import { UserButton,OrganizationSwitcher } from "@clerk/clerk-react";



export default function Navbar() {


    return (
        <div className="flex items-center justify-between px-4 py-2">

            <div className="flex items-center gap-2">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={32}  // 设置一个基准宽度
                        height={32} // 设置一个基准高度
                        className="w-auto h-8 object-contain" // 保持比例，高度8
                    />
                </Link>

                <div className="flex flex-col justify-center ">
                    <DocumentTitle></DocumentTitle>
                    <div >
                        <Menubar className="bg-transparent border-none shadow-none p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal px-1.5 py-1
                                -normal rounded-sm hover:!bg-gray-200">
                                    File
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem className="gap-2">
                                        <SaveIcon className="w-4 h-4" />
                                        Save

                                    </MenubarItem>
                                    <MenubarItem className="gap-2">
                                        <FileIcon className="w-4 h-4" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem className="gap-2">
                                        <PencilIcon className="w-4 h-4" />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem className="gap-2">
                                        <TrashIcon className="w-4 h-4" />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem className="gap-2">
                                        <PrinterIcon className="w-4 h-4" />
                                        Print
                                        <MenubarShortcut>⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal px-1.5 -normal rounded-sm hover:!bg-gray-200">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem className="gap-2">
                                        <UndoIcon className="w-4 h-4" />
                                        Undo
                                        <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem className="gap-2">
                                        <RedoIcon className="w-4 h-4" />
                                        Redo
                                        <MenubarShortcut>⌘Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal px-1.5 -normal rounded-sm hover:!bg-gray-200">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem className="gap-2">
                                        <TableIcon className="w-4 h-4" />
                                        Table
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <OrganizationSwitcher />
                <UserButton />
            </div>


        </div>
    )
}