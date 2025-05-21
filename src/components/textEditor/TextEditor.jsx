import { memo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
//components
import { Editor } from "@tinymce/tinymce-react";
import ButtonComponent from "../button/Button.component";
//icons
import { IoSend } from "react-icons/io5";

const TextEditor = ({ setValue, sendMessage }) => {
  const editorRef = useRef(null);

  const handleEditorChange = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setValue(content);
      sendMessage(content);
    }
  }, [setValue, sendMessage]);

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
          setup: (editor) => {
            editor.on("keydown", (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const content = editor.getContent();
                sendMessage(content);
                setValue("");
              }
            });
          },
        }}
      />
      <div className="text-editor__btn">
        <ButtonComponent
          size="sm"
          varient="primary"
          onClick={handleEditorChange}>
          <IoSend />
        </ButtonComponent>
      </div>
    </div>
  );
};

export default memo(TextEditor);

TextEditor.propTypes = {
  setValue: PropTypes.func.isRequired,
  sendMessage: PropTypes.func,
};
