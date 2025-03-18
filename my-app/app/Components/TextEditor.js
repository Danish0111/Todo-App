'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

const Tiptap = ({ description, selectedTodo, setSelectedTodo }) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, TextStyle, Color, Underline, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: description,
  })

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description)
    }
  }, [description, editor])

  useEffect(() => {
    if (!editor) return

    const updateHandler = () => {
      const html = editor.getHTML()

      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;
      const text = tempElement.innerText;
      
      // Ensure selectedTodo is not null before updating it
      if (selectedTodo) {
        setSelectedTodo({ ...selectedTodo, description: text })
      }
    }

    editor.on('update', updateHandler)

    // Cleanup the listener on unmount or when editor changes
    return () => {
      editor.off('update', updateHandler)
    }
  }, [editor, selectedTodo, setSelectedTodo])


  if (!editor) {
    return null
  }

  return (
    <div className="text-editor h-[80vh] mt-5">
      {/* Toolbar */}
      <div className="toolbar flex gap-3 mb-3 border-b-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-gray-300' : ''} `}
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V0H5.56098C6.63415 0 7.56504 0.35 8.35366 1.05C9.14228 1.75 9.53658 2.63333 9.53658 3.7C9.53658 4.33333 9.36585 4.91667 9.02439 5.45C8.68293 5.98333 8.22764 6.39167 7.65854 6.675V6.825C8.35772 7.05833 8.92276 7.475 9.35366 8.075C9.78455 8.675 10 9.35 10 10.1C10 11.2333 9.57317 12.1667 8.71951 12.9C7.86585 13.6333 6.86992 14 5.73171 14H0ZM2.09756 5.925H5.41463C5.98374 5.925 6.47561 5.73333 6.89024 5.35C7.30488 4.96667 7.5122 4.48333 7.5122 3.9C7.5122 3.31667 7.30488 2.82917 6.89024 2.4375C6.47561 2.04583 5.98374 1.85 5.41463 1.85H2.09756V5.925ZM2.09756 12.1H5.60976C6.22764 12.1 6.76423 11.8917 7.21951 11.475C7.6748 11.0583 7.90244 10.5333 7.90244 9.9C7.90244 9.28333 7.6748 8.76667 7.21951 8.35C6.76423 7.93333 6.22764 7.725 5.60976 7.725H2.09756V12.1Z" fill="black" />
          </svg>

        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V11.8125H2.93571L6.75 2.1875H3.42857V0H12V2.1875H9.06429L5.25 11.8125H8.57143V14H0Z" fill="black" />
          </svg>

        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
        >
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15V13.75H12V15H0ZM6 11.6667C4.55714 11.6667 3.33929 11.1875 2.34643 10.2292C1.35357 9.27083 0.857143 8.09722 0.857143 6.70833V0H2.57143V6.75C2.57143 7.66667 2.9 8.4375 3.55714 9.0625C4.21429 9.6875 5.02857 10 6 10C6.97143 10 7.78571 9.6875 8.44286 9.0625C9.1 8.4375 9.42857 7.66667 9.42857 6.75V0H11.1429V6.70833C11.1429 8.09722 10.6464 9.27083 9.65357 10.2292C8.66072 11.1875 7.44286 11.6667 6 11.6667Z" fill="black" />
          </svg>

        </button>

        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V12.8333H8V14H0ZM0 10.7917V9.625H10V10.7917H0ZM0 7.58333V6.41667H14V7.58333H0ZM0 4.375V3.20833H10V4.375H0ZM0 1.16667V0H8V1.16667H0Z" fill="black" />
          </svg>

        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V12.8333H14V14H0ZM3.18889 10.7917V9.625H10.8306V10.7917H3.18889ZM0 7.58333V6.41667H14V7.58333H0ZM3.18889 4.375V3.20833H10.8306V4.375H3.18889ZM0 1.16667V0H14V1.16667H0Z" fill="black" />
          </svg>
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="p-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V12.8333H14V14H0ZM4.84167 10.7917V9.625H14V10.7917H4.84167ZM0 7.58333V6.41667H14V7.58333H0ZM4.84167 4.375V3.20833H14V4.375H4.84167ZM0 1.16667V0H14V1.16667H0Z" fill="black" />
          </svg>

        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className="p-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14V12.8333H14V14H0ZM0 10.7917V9.625H14V10.7917H0ZM0 7.58333V6.41667H14V7.58333H0ZM0 4.375V3.20833H14V4.375H0ZM0 1.16667V0H14V1.16667H0Z" fill="black" />
          </svg>

        </button>

        {/* Text Color Picker */}
        <div className="relative flex items-center">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-7 h-7 opacity-0 absolute cursor-pointer"
          />
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.55208 0.671176L3.17917 0L8.25417 5.43184C8.47778 5.67118 8.58958 5.96514 8.58958 6.31374C8.58958 6.66233 8.47778 6.9563 8.25417 7.19563L5.65833 9.97399C5.43472 10.2133 5.17222 10.333 4.87083 10.333C4.56945 10.333 4.30694 10.2133 4.08333 9.97399L1.4875 7.19563C1.26389 6.9563 1.15208 6.66233 1.15208 6.31374C1.15208 5.96514 1.26389 5.67118 1.4875 5.43184L4.24375 2.48179L2.55208 0.671176ZM4.87083 3.15297L1.96875 6.25911H7.77292L4.87083 3.15297ZM9.8 10.5983C9.50833 10.5983 9.26042 10.4891 9.05625 10.2706C8.85208 10.052 8.75 9.78668 8.75 9.47451C8.75 9.29761 8.78889 9.1051 8.86667 8.89698C8.94445 8.68887 9.05139 8.47555 9.1875 8.25702C9.26528 8.12175 9.36007 7.97607 9.47188 7.81998C9.58368 7.66389 9.69306 7.51821 9.8 7.38293C9.90694 7.51821 10.0163 7.66389 10.1281 7.81998C10.2399 7.97607 10.3347 8.12175 10.4125 8.25702C10.5486 8.47555 10.6556 8.68887 10.7333 8.89698C10.8111 9.1051 10.85 9.29761 10.85 9.47451C10.85 9.78668 10.7479 10.052 10.5438 10.2706C10.3396 10.4891 10.0917 10.5983 9.8 10.5983ZM0 15V13.1113H11.6667V15H0Z" fill="black" />
          </svg>
        </div>

      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="editor text-[18px] font-normal" />
    </div>
  )
}

export default Tiptap
