import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height
       */
      setLineHeight: (height: string) => ReturnType;
      /**
       * Unset the line height
       */
      unsetLineHeight: () => ReturnType;
    }
  }
}

export interface LineHeightOptions {
  types: string[];
  defaultLineHeight: string;
}

export default Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'normal',
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => element.style.lineHeight?.replace(/['"]+/g, '') || this.options.defaultLineHeight,
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
      setLineHeight: (lineHeight: string) => ({ chain }) => {
        return chain()
          .updateAttributes('paragraph', { lineHeight })
          .updateAttributes('heading', { lineHeight })
          .run()
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain()
          .updateAttributes('paragraph', { lineHeight: this.options.defaultLineHeight })
          .updateAttributes('heading', { lineHeight: this.options.defaultLineHeight }) 
          .run()
      }
    }
  },
})
