"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormikContext } from "formik";
import TiptapMenuBar from "./TiptapMenuBar";
import { Label } from "./ui/label";

interface TiptapRichtextEditorProps<T> {
  label: string;
  name: keyof T & string;
}

const TiptapRichtextEditor = <T,>({
  label,
  name,
}: TiptapRichtextEditorProps<T>) => {
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    touched,
    values,
  } = useFormikContext<T>();

  const editor = useEditor({
    extensions: [StarterKit],
    content: values[name] as string,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert border rounded-md p-3 min-h-[156px] max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setFieldValue(name, editor.getHTML());
    },
    onFocus: () => {
      setFieldTouched(name, true);
    },
    onBlur: () => {
      if (editor?.isEmpty) setFieldError(name, `${label} is required`);
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <Label>{label}</Label>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor?.isEmpty && touched[name] && (
        <p className="text-xs text-red-500">{label} is required</p>
      )}
    </div>
  );
};

export default TiptapRichtextEditor;
