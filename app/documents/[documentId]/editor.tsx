
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text'
import FontSize from '@/extension/font-size'
import LineHeight from '@/extension/line-height'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import ImageResize from 'tiptap-extension-resize-image';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'

import { Color } from '@tiptap/extension-color'




import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
  const leftPadding = 56;
  const rightPadding = 56;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Text,
      TextStyle,
      FontFamily,
      FontSize,
      LineHeight,
      Underline,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        protocols: ['http', 'https'],
      }),
      ImageResize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
        <h2 style="text-align: center">Heading</h2>
        <p style="text-align: center">first paragraph</p>
        <p style="text-align: right">second paragraph</p>
        <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
         <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <p><span style="color: #958DF1">Oh, for some reason that’s purple.</span></p>
        <p><span style="color: #FF0000">Oh, for some reason that’s red.</span></p>
        <p><mark style="background-color: red;">And this is highlighted too, but in a different color.</mark></p>
        <p><mark data-color="#ffa8a8">And this one has a data attribute.</mark></p>
        <p><mark data-color="#958DF1" data-background-color="#958DF1">And this one has a data attribute.</mark></p>
        <p><mark data-color="#ffa8a8" data-background-color="#ffa8a8" data-color="#ffa8a8">And this one has a data attribute.</mark></p>
        <p>Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.</p>
        <img src="https://images.pexels.com/photos/28594392/pexels-photo-28594392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /
    `,
    editorProps: {
      attributes: {
        class: 'focus:outline-none print:border-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] mx-auto my-8 w-[calc(min(100%,816px))] py-[clamp(12px,4%,32px)] cursor-text min-h-[1054px] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-sm ',
        style: `padding-left: ${leftPadding}px; padding-right: ${rightPadding}px;`
      },
    },
  })

  return <EditorContent editor={editor} />
}

