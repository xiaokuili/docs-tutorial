'use client'

import {
  LucideIcon,
  Undo,
  Redo,
  Printer,
  Check,
  Bold,
  Italic,
  Underline,
  SpellCheck2Icon,
  MessageSquare,
  List,
  ListOrdered,
  ListTodo,
  RemoveFormatting,
} from 'lucide-react';
import React from 'react';
import { CirclePicker, ColorResult } from 'react-color'
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/hook/use-editor';
import { Button } from '@/components/ui/button';

export default function Toolbar() {
  const { editor } = useEditor();
  const sections: {
    label: string,
    Icon: LucideIcon,
    onClick: () => void,
    isActive: boolean
  }[][] = [
      [
        { label: 'Undo', Icon: Undo, onClick: () => editor?.chain().focus().undo().run() },
        { label: 'Redo', Icon: Redo, onClick: () => editor?.chain().focus().redo().run() },
        { label: 'Print', Icon: Printer, onClick: () => window.print() },
        {
          label: 'Spell Check', Icon: SpellCheck2Icon, onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck")
            console.log(current)
            editor?.view.dom.setAttribute("spellcheck", current === 'false' ? "true" : "false")
          }
        },
      ],
      [
        {
          label: 'Bold',
          Icon: Bold,
          onClick: () => editor?.chain().focus().toggleBold().run(),
          isActive: editor?.isActive('bold') ?? false
        },
        {
          label: 'Italic',
          Icon: Italic,
          onClick: () => editor?.chain().focus().toggleItalic().run(),
          isActive: editor?.isActive('italic') ?? false
        },
        {
          label: 'Underline',
          Icon: Underline,
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
          isActive: editor?.isActive('underline') ?? false
        }
      ],
      [
        {
          label: 'Comment',
          Icon: MessageSquare,
          onClick: () => console.log('comment'),
          isActive: false
        },
        {
          label: 'Task List',
          Icon: ListTodo,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive('taskList') ?? false
        },
        {
          label: 'Remove Formatting',
          Icon: RemoveFormatting,
          onClick: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
          isActive: false
        }
      ]
    ]


  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5  min-h-[40px] flex items-center gap-x-0.5 overflow-auto">

      {sections[0].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} label={label} Icon={Icon} onClick={onClick} active={isActive} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Heading  */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {/* TODO: Font Size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} label={label} Icon={Icon} onClick={onClick} active={isActive} />
      ))}
      {/* TODO: Text Color */}
      {/* TODO: Highlight Color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List  */}
      {sections[2].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} label={label} Icon={Icon} onClick={onClick} active={isActive} />
      ))}
    </div>
  )
}


interface ToolbarButtonProps {
  Icon: LucideIcon;
  onClick: () => void;
  active: boolean;
}

function ToolbarButton({ Icon, onClick, active }: ToolbarButtonProps) {
  return (
    <button onClick={onClick}
      className={cn(" text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden", active && "bg-neutral-200/80")}>
      <Icon className="w-4 h-4" />
    </button>
  )
}