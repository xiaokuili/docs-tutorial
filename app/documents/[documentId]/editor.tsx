'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ImageResize from 'tiptap-extension-resize-image';
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import FontSize from '@/extensions/font-size'
import LineHeight from '@/extensions/line-height'

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Underline as UnderlineExtension } from '@tiptap/extension-underline'
import { useEditor as useEditorStore } from '@/hook/use-editor';
import { Threads } from './thread'

export default function Editor() {
  const { setEditor } = useEditorStore()
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    onCreate: (props) => {
      setEditor(props.editor)
    },
    onDestroy: () => {
      setEditor(null)
    },
    onUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor)
    },
    onTransaction: ({ editor }) => {
      setEditor(editor)
    },
    onFocus: ({ editor }) => {
      setEditor(editor)
    },
    onBlur: ({ editor }) => {
      setEditor(editor)
    },

    onContentError: ({ editor }) => {
      setEditor(editor)
    },
    extensions: [
      liveblocks, 
      StarterKit.configure({
        history:false, 

      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      ImageResize,
      UnderlineExtension,
      FontFamily,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSize,
      LineHeight.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
        <table>
        <tbody>
            <tr>
            <th>Name</th>
            <th colspan="3">Description</th>
            </tr>
            <tr>
            <td>Cyndi Lauper</td>
            <td>Singer</td>
            <td>Songwriter</td>
            <td>Actress</td>
            </tr>
        </tbody>
        </table>
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
    `,
    editorProps: {
      attributes: {
        class: `prose max-w-none min-h-[297mm] p-[96px] text-[11pt] text-gray-800 font-normal leading-[1.5] outline-none focus:outline-none focus:ring-0 selection:bg-blue-200 print:shadow-none print:m-0 print:p-[0.5in] [&>*]:min-h-[1em] bg-white shadow-lg`,
        style: 'padding-left: 56px; padding-right: 56px;'
      },
    },
    immediatelyRender: false, // 👈 添加这行


  })

  return (
    <div className="bg-white rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[1056px] w-full relative">
      <EditorContent
        editor={editor}
      />
      <Threads editor={editor} />
    </div>
  )
}
