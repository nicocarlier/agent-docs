import { TextStyleKit } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DEFAULT_EDITOR_CONTENT } from "../constants/tiptap-defaults.const";

const extensions = [TextStyleKit, StarterKit];

export const useTiptapEditor = () => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false, // Fix for SSR hydration issues
    content: DEFAULT_EDITOR_CONTENT,
    editable: true,
    autofocus: true,
  });

  if (!editor) {
    return null;
  }

  return editor;
};
