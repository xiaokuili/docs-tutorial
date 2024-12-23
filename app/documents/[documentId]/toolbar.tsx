'use client'

import {
  LucideIcon,
  Undo,
  Redo,
  Printer,
  Bold,
  Italic,
  Underline,
  SpellCheck2Icon,
  MessageSquare,
  ListTodo,
  RemoveFormatting,
  ChevronDown,
  HighlighterIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  MinusIcon,
  ListCollapseIcon
} from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CirclePicker } from 'react-color'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/hook/use-editor';
import { Link } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Toolbar() {
  const { editor } = useEditor();
  const sections: {
    label: string,
    Icon: LucideIcon,
    onClick: () => void,
    isActive?: boolean
  }[][] = [
      [
        { label: 'Undo', Icon: Undo, onClick: () => editor?.chain().focus().undo().run(), isActive: false },
        { label: 'Redo', Icon: Redo, onClick: () => editor?.chain().focus().redo().run(), isActive: false },
        { label: 'Print', Icon: Printer, onClick: () => window.print(), isActive: false },
        {
          label: 'Spell Check', Icon: SpellCheck2Icon, onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck")
            console.log(current)
            editor?.view.dom.setAttribute("spellcheck", current === 'false' ? "true" : "false")
          },
          isActive: false
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
          onClick: () => editor?.chain().focus().addPendingComment().run(),
          isActive: editor?.isActive("liveblocksCommentMark") ?? false
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
    <div className="bg-[#F1F4F9] px-2.5 py-0.5  min-h-[40px] flex items-center gap-x-1 overflow-auto">

      {sections[0].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} Icon={Icon} onClick={onClick} active={isActive ?? false} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} Icon={Icon} onClick={onClick} active={isActive ?? false} />
      ))}
      <ColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      <LineHeightButton />
      {sections[2].map(({ label, Icon, onClick, isActive }) => (
        <ToolbarButton key={label} Icon={Icon} onClick={onClick} active={isActive ?? false} />
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


function FontFamilyButton() {
  const { editor } = useEditor();

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
          className=" text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <span className="text-xs">{currentFontFamily}</span>
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


const HeadingLevelButton = () => {
  const { editor } = useEditor();
  const levels = [1, 2, 3, 4, 5];
  const currentLevel = levels.find(level => editor?.isActive('heading', { level }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5"
        >
          {currentLevel ? `H${currentLevel}` : 'Normal'}
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 flex flex-col gap-1">
        <button
          className={cn(
            "flex items-center px-2 py-1 rounded-sm hover:bg-neutral-200/80",
            !currentLevel && "bg-neutral-200/80"
          )}
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          <span className="text-sm">Normal</span>
        </button>
        {levels.map(level => (
          <button
            key={level}
            className={cn(
              "flex items-center px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive('heading', { level: level as 1 | 2 | 3 | 4 | 5 }) && "bg-neutral-200/80"
            )}
            onClick={() => editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 }).run()}
          >
            <span className={`${level === 1 ? 'text-2xl font-bold' : level === 2 ? 'text-xl font-semibold' : level === 3 ? 'text-base font-medium' : level === 4 ? 'text-sm font-medium' : level === 5 ? 'text-xs font-medium' : 'text-xs font-medium'}`}>Heading {level}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ColorButton = () => {
  const { editor } = useEditor();

  const currentColor = editor?.getAttributes('textStyle').color || 'black';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center  rounded hover:bg-neutral-100">
          <span className="text-xs">A</span>
          <div
            className="w-5 h-0.5 rounded"
            style={{ backgroundColor: currentColor }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-2">
        <CirclePicker
          color={currentColor}
          onChange={(color) => {
            editor?.chain().focus().setColor(color.hex).run()
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const HighlightColorButton = () => {
  const { editor } = useEditor();

  const currentColor = editor?.getAttributes('highlight').color || 'transparent';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded hover:bg-neutral-100">
          <HighlighterIcon className="w-4 h-4" style={{ color: currentColor === 'transparent' ? 'black' : currentColor }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-2">
        <CirclePicker
          color={currentColor}
          onChange={(color) => {
            if (currentColor === color.hex) {
              editor?.chain().focus().toggleHighlight().run()
            } else {
              editor?.chain().focus().toggleHighlight({ color: color.hex }).run()
            }
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const LinkButton = () => {
  const { editor } = useEditor();
  const [url, setUrl] = React.useState(editor?.getAttributes('link').href || "");
  const isActive = editor?.isActive('link');

  const handleApply = () => {
    editor?.chain().focus().setLink({ href: url }).run()
    setUrl("")
  }
  return (
    <DropdownMenu onOpenChange={() => {
      setUrl(editor?.getAttributes('link').href || "")
    }}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden",
            isActive && "bg-neutral-200/80"
          )}
        >
          <Link className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-2.5 flex items-center gap-x-2">
        <div className="flex  gap-2 min-w-[240px]">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.currentTarget.value)

            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleApply()
              }
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const ImageButton = () => {
  const { editor } = useEditor();
  const [url, setUrl] = React.useState(editor?.getAttributes('image').src || "");
  const [showUrlDialog, setShowUrlDialog] = React.useState(false);

  const handleApply = () => {
    editor?.chain().focus().setImage({ src: url }).run()
    setShowUrlDialog(false)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement file upload logic
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor?.chain().focus().setImage({ src: result }).run()
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="p-1">
          <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-neutral-200/80 rounded-sm cursor-pointer">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
          <button
            className="flex items-center gap-2 px-2 py-1.5 w-full hover:bg-neutral-200/80 rounded-sm"
            onClick={() => setShowUrlDialog(true)}
          >
            <Link className="w-4 h-4" />
            <span className="text-sm">Image URL</span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showUrlDialog} onOpenChange={setShowUrlDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Image URL</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://example.com/image.png"
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleApply()
                }
              }}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleApply}>
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};


const AlignButton = () => {
  const { editor } = useEditor();
  const alignOptions = [
    { label: 'Left', value: 'left', icon: AlignLeft },
    { label: 'Center', value: 'center', icon: AlignCenter },
    { label: 'Right', value: 'right', icon: AlignRight },
    { label: 'Justify', value: 'justify', icon: AlignJustify },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <AlignLeft className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1">
        {alignOptions.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            className={cn("flex items-center gap-2 px-2 py-1.5 w-full hover:bg-neutral-200/80 rounded-sm", editor?.isActive({ textAlign: value }) && "bg-neutral-200/80")}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ListButton = () => {
  const { editor } = useEditor();
  const listOptions = [
    { label: 'Bullet List', value: 'bulletList', icon: List, onClick: () => editor?.chain().focus().toggleBulletList().run() },
    { label: 'Ordered List', value: 'orderedList', icon: ListOrdered, onClick: () => editor?.chain().focus().toggleOrderedList().run() },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <List className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1">
        {listOptions.map(({ label, value, icon: Icon, onClick }) => (
          <button
            key={value}
            className={cn("flex items-center gap-2 px-2 py-1.5 w-full hover:bg-neutral-200/80 rounded-sm", editor?.isActive(value) && "bg-neutral-200/80")}
            onClick={onClick}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const FontSizeButton = () => {
  const { editor } = useEditor();
  const currentFontSize = editor?.getAttributes('textStyle').fontSize || '16px';
  const [fontSize, setFontSize] = React.useState(currentFontSize);
  const [inputValue, setInputValue] = React.useState(fontSize);
  const [isEditing, setIsEditing] = React.useState(false);

  const updateFontSize = (newSize: number | string) => {
    const size = typeof newSize === 'string' ? parseInt(newSize) : newSize;
    if (isNaN(size)) return;
    const newFontSize = `${size}px`;
    setFontSize(size.toString())
    editor?.chain().focus().setFontSize(newFontSize).run();
    setInputValue(size.toString());
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateFontSize(inputValue)
      editor?.commands.focus()
      setIsEditing(false)
    }
  }

  return (
    <div className='flex items-center gap-x-0.5'>
      <button className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 '>
        <MinusIcon onClick={() => updateFontSize(parseInt(fontSize) - 1)} className="w-4 h-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={parseInt(inputValue)}
          onChange={handleInputChange}
          onBlur={() => {
            updateFontSize(inputValue)
            setIsEditing(false)
            editor?.commands.focus()
          }}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80 focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
        >
          {parseInt(inputValue)}
        </button>
      )}
    </div>
  )
}


const LineHeightButton = () => {
  const { editor } = useEditor();
  const lineHeightOptions = [
    { label: '1.0', value: '1.0' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: '2.0', value: '2.0' },
    { label: '2.5', value: '2.5' },
    { label: '3.0', value: '3.0' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <ListCollapseIcon className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1 space-y-1">
        {lineHeightOptions.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 w-full hover:bg-neutral-200/80 rounded-sm",
              editor?.getAttributes('paragraph').lineHeight === value && "bg-neutral-200/80"
            )}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
          >
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

