"use client";

import { EditorContent } from "@tiptap/react";
import EditorWrapper from "@/src/components/Editor/EditorWrapper";
import { useTiptapEditor } from "@/src/hooks/useTiptapEditor";
import MenuBar from "@/src/components/Editor/MenuBar";

export default function Example() {
  const editor = useTiptapEditor();

  // Show loading state while editor is initializing
  if (!editor) {
    return (
      <EditorWrapper isLoading={true}>
        <div className="document-content flex flex-col min-h-[11in] h-fit w-full border border-gray-300 flex-1 bg-white">
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading editor...</div>
          </div>
        </div>
      </EditorWrapper>
    );
  }

  return (
    <EditorWrapper>
      <div className="document-content flex flex-col min-h-[11in] h-fit w-full border border-gray-300 flex-1 bg-white">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="flex-1 overflow-y-auto min-w-[818px] max-w-[818px] w-[818px]"
        />
      </div>
    </EditorWrapper>
  );
}
