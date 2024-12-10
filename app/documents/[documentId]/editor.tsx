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
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'

import { Underline as UnderlineExtension } from '@tiptap/extension-underline'
import { useEffect } from 'react';
import { useEditor as useEditorStore } from '@/hook/use-editor';

export default function Editor() {
  const { setEditor } = useEditorStore()
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

    onContentError: ({ editor, error, disableCollaboration }) => {
      setEditor(editor)
    },
    extensions: [
      StarterKit,
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
      Heading,
      Highlight.configure({ multicolor: true })
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
    <div role="textbox" aria-label="Rich text editor">
      <EditorContent
        editor={editor}
      />
    </div>
  )
}
