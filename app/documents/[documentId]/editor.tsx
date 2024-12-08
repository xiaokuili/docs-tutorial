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

export default function Editor() {
  const editor = useEditor({
    extensions: [
        StarterKit, 
        TaskList, 
        TaskItem.configure({nested: true}),
        Table.configure({
            resizable: true,
        }),
        TableCell,
        TableHeader,
        TableRow,
        ImageResize
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
  })

  return (
    <EditorContent 
        editor={editor} 
  
    />   
  )
}
