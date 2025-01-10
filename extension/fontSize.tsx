import { Extension } from '@tiptap/core'

export type FontSizeOptions = {
  /**
   * A list of node names where the font size can be applied.
   * @default ['textStyle']
   * @example ['heading', 'paragraph'] 
   */
  types: string[],
  defaultFontSize: string,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       * @param fontSize The font size (with unit, e.g. '12px', '1.5rem')
       * @example editor.commands.setFontSize('16px')
       */
      setFontSize: (fontSize: string) => ReturnType,
      /**
       * Unset the font size
       * @example editor.commands.unsetFontSize()
       */
      unsetFontSize: () => ReturnType,
    }
  }
}

/**
 * This extension allows you to set font sizes for text.
 * @see Documentation to be added
 */
export default Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultFontSize: '16px',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
