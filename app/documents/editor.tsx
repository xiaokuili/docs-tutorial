'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link'
import FontSize from '@/extension/fontSize'
import LineHeight from '@/extension/linehight'
import useEditorStore from '@/hook/useEditor'



const Editor = () => {
  const { setEditor } = useEditorStore()
  const editor = useEditor({

    onBeforeCreate({ editor }) {
      // Before the view is created
      setEditor(editor)
    },
    onCreate({ editor }) {
      // The editor is ready
      setEditor(editor)
    },
    onUpdate({ editor }) {
      // The content has changed
      setEditor(editor)
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed
      setEditor(editor)
    },
    onTransaction({ editor }) {
      // The editor state has changed
      setEditor(editor)
    },
    onFocus({ editor }) {
      // The editor is focused
      setEditor(editor)
    },
    onBlur({ editor }) {
      // The editor isn't focused anymore
      setEditor(editor)
    },
    onDestroy() {
      // The editor is being destroyed
      setEditor(null)
    },
    
    onContentError({ editor }) {
      // The editor content does not match the schema
      setEditor(editor)
    },
    extensions: [
      StarterKit,
      ImageResize,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      FontSize,
      LineHeight,
      
    ],
    immediatelyRender: false,
    content: `
      <img src="https://placehold.co/800x400" />
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
      <p><a href="https://example.com">This is a link example</a></p>
      <p><mark data-color="#ffa8a8">And this one has a data attribute.</mark></p>
      <p style="text-decoration: underline">And this as well.</p>
      <p><span style="color: #958DF1">Oh, for some reason that’s purple.</span></p>
      <p><span style="font-family: 'Exo 2'">TipTap even can handle exotic fonts as Exo 2.</span></p>
      <p style="text-align: right">second paragraph</p>
       <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <p><span style="font-size: 40px">This is a test</span></p>
        <p><span style="line-height: 1.5">This is a test</span></p>
        <p><span style="line-height: 2.5">This is a test</span></p>


      `,
    editorProps: {
      attributes: {
        class: 'w-full max-w-4xl mx-auto py-8 min-h-[80vh] bg-white dark:bg-neutral-900 shadow-sm rounded-lg border border-gray-200 dark:border-neutral-800 focus:outline-none prose prose-slate dark:prose-invert mb-4',
        style: 'padding-left: 56px; padding-right: 56px'
      },
    },
  })


  return <EditorContent editor={editor} />
}

export default Editor