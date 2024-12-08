import { create } from 'zustand'
import { Editor } from '@tiptap/react'

interface EditorStore {
  editor: Editor | null
  setEditor: (editor: Editor | null) => void
}

export const useEditor = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor })
}))
