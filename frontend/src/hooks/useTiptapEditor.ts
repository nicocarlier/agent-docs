import { useEffect, useRef } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DEFAULT_EDITOR_CONTENT } from "../constants/tiptap-defaults.const";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

const extensions = [TextStyle, StarterKit];

export const useTiptapEditor = ({
  documentId,
  token,
  user,
}: {
  documentId?: string;
  token?: string;
  user?: { name: string; color: string };
}) => {
  const providerRef = useRef<HocuspocusProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);

  // Temporarily disable collaboration to fix WebSocket issues
  const enableCollaboration = false; // documentId && token && typeof window !== "undefined";

  const editor = useEditor({
    extensions: [
      ...extensions,
      ...(enableCollaboration
        ? [
            Collaboration.configure({
              document: (() => {
                const ydoc = new Y.Doc();
                ydocRef.current = ydoc;
                providerRef.current = new HocuspocusProvider({
                  name: documentId!,
                  url: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_URL!,
                  token,
                  document: ydoc,
                });
                return ydoc;
              })(),
            }),
            CollaborationCursor.configure({
              provider: (() => providerRef.current!)(),
              user: user || { name: "Anonymous", color: "#18A0FB" },
            }),
          ]
        : []),
    ],
    content: enableCollaboration ? undefined : DEFAULT_EDITOR_CONTENT,
    editable: true,
    autofocus: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    return () => {
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }
      if (ydocRef.current) {
        ydocRef.current.destroy();
        ydocRef.current = null;
      }
    };
  }, []);

  return editor;
};
