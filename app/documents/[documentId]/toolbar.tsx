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

} from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/hook/use-editor';


export default function Toolbar() {
  const { editor } = useEditor();

  const editorToolItems: { icon: LucideIcon, onClick: () => void, label: string }[] = [
    {
      icon: Undo,
      onClick: () => editor?.chain().focus().undo().run(),
      label: 'undo'
    },
    {
      icon: Redo,
      onClick: () => editor?.chain().focus().redo().run(),
      label: 'redo'
    },
    {
      icon: Printer,
      onClick: () => window.print(),
      label: 'print'
    },
    {
      icon: Check,
      onClick: () => {
        // TODO: Implement grammar check functionality
        console.log('Grammar check clicked')
      },
      label: 'grammarCheck'
    },
  ];
  const fontToolItems: { icon: LucideIcon, onClick: () => void, label: string }[] = [
    {
      icon: Bold,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      label: 'bold'
    },
    {
      icon: Italic,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      label: 'italic'
    },
    {
      icon: Underline,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      label: 'underline'
    }
  ]



  return (
    <div className="bg-transparent rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-1">
        {editorToolItems.map((item, index) => (
          <ToolbarButton
            icon={item.icon}
            onClick={item.onClick}
            label={item.label}
            key={index}
          />

        ))}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        {fontToolItems.map((item, index) => (
          <ToolbarButton
            icon={item.icon}
            onClick={item.onClick}
            label={item.label}
            key={index}
          />
        ))}

        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <FontFamilySelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
        {/* TODO： Heading */}
        <HeadingSelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
        {/* TODO: Font size */}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
        {/* TODO: Text Color */}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
        {/* TODO: Highlight Color*/}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
        {/* TODO: Link */}
        {/* TODO: Image */}
        {/* TODO: Align  */}
        {/* TODO: Line height */}
        {/* TODO: List */}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
      </div>
    </div>
  )
}


interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label: string;
}

function ToolbarButton({ icon: Icon, onClick, label }: ToolbarButtonProps) {
  const { editor } = useEditor();
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    if (!editor) return;

    const updateIsActive = () => {
      const active = editor.isActive(label);
      setIsActive(active);
    };

    // 初始状态
    updateIsActive();

    // 监听变化
    editor.on('transaction', updateIsActive);
    editor.on('focus', updateIsActive);
    editor.on('blur', updateIsActive);

    return () => {
      editor.off('transaction', updateIsActive);
      editor.off('focus', updateIsActive);
      editor.off('blur', updateIsActive);
    };
  }, [editor, label]);

  const handleClick = () => {
    if (!editor) return;
    onClick();
    // 强制更新状态
    setIsActive(editor.isActive(label));
    console.log(`${label} active:`, isActive)
  };
  return (
    <button
      onClick={handleClick}
      className={`px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-200' : ''
        }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}


const FONT_FAMILIES = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Verdana', value: 'Verdana' }
];

function FontFamilySelector() {
  const { editor } = useEditor();
  const [activeFont, setActiveFont] = useState<string>('Arial');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateActiveFont = () => {
      const attrs = editor.getAttributes('textStyle');
      if (attrs.fontFamily) {
        setActiveFont(attrs.fontFamily);
      }
    };

    editor.on('transaction', updateActiveFont);
    editor.on('focus', updateActiveFont);

    return () => {
      editor.off('transaction', updateActiveFont);
      editor.off('focus', updateActiveFont);
    };
  }, [editor]);

  const handleFontChange = (font: string) => {
    if (!editor) return;
    editor.chain().focus().setFontFamily(font).run();
    setActiveFont(font);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
        <span className="text-sm" style={{ fontFamily: activeFont }}>
          {activeFont}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event) => {
          event.preventDefault(); // 防止自动聚焦
        }}
      >
        {FONT_FAMILIES.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() => handleFontChange(font.value)}
            className="min-w-[150px]"
          >
            <span style={{ fontFamily: font.value }}>{font.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeadingSelector() {
  const { editor } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('Normal');
  const HEADING_OPTIONS = [
    { label: 'Normal', value: 'paragraph', fontSize: '1rem' },
    { label: 'Heading 1', value: 'h1', fontSize: '1.4rem' },
    { label: 'Heading 2', value: 'h2', fontSize: '1.2rem' }, 
    { label: 'Heading 3', value: 'h3', fontSize: '1.1rem' },
    { label: 'Heading 4', value: 'h4', fontSize: '1rem' },
    { label: 'Heading 5', value: 'h5', fontSize: '1rem' },

  ];

  useEffect(() => {
    if (!editor) return;

    const updateActiveHeading = () => {
      const activeOption = HEADING_OPTIONS.find(option => 
        (option.value === 'paragraph' && editor.isActive('paragraph')) ||
        editor.isActive(option.value)
      );
      setActiveHeading(activeOption?.label || 'Normal');
    };

    editor.on('transaction', updateActiveHeading);
    editor.on('focus', updateActiveHeading);

    return () => {
      editor.off('transaction', updateActiveHeading);
      editor.off('focus', updateActiveHeading);
    };
  }, [editor]);

  const handleHeadingChange = (value: string) => {
    if (!editor) return;
    
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      // Fix the type error by explicitly typing the level
      const level = parseInt(value.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    }
    
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
        <span className="text-sm">
          {activeHeading}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        {HEADING_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleHeadingChange(option.value)}
            className="min-w-[150px] "
          >
            <span style={{ fontSize: option.fontSize }}>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
