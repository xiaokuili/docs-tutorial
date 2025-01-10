import { Extension } from '@tiptap/core'

export type LineHeightOptions = {
  /**
   * A list of node names where the line height can be applied.
   * @default ['textStyle']
   * @example ['heading', 'paragraph'] 
   */
  types: string[],
  defaultLineHeight: string,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height
       * @param lineHeight The line height (with unit, e.g. '1.5', '24px')
       * @example editor.commands.setLineHeight('1.5')
       */
      setLineHeight: (lineHeight: string) => ReturnType,
      /**
       * Unset the line height
       * @example editor.commands.unsetLineHeight()
       */
      unsetLineHeight: () => ReturnType,
    }
  }
}

/**
 * This extension allows you to set line heights for text.
 * @see Documentation to be added
 */
export default Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultLineHeight: '1.5',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: element => element.style.lineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {}
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight: lineHeight => ({ chain }) => {
        return chain()
          .setMark('textStyle', { lineHeight })
          .run()
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { lineHeight: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
