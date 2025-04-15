import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = () => {
  const editorRef = useRef(null);

  return (
    <div className="text-editor">
      <Editor
        apiKey="ox9h91sjfh58ziz2u5cj2emlq78vmrcdkiy5j8pl9ej6pyom"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p></p>"
        init={{
          selector: "textarea",
          height: 200,
          menubar: false,
          plugins: [
            "advlist",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            " | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

          statusbar: false,
          highlight_on_focus: false,
        }}
      />
    </div>
  );
};

export default TextEditor;
