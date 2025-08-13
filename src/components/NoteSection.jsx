import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";

const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", { color: [] }],
    [{ list: "bullet" }, { list: "ordered" }],
    [{ align: [] }],
    ["formula", "link", "image"],
  ],
};

function NoteSection({ value, noteSections, setNoteSections, index, setEditing }) {
  const [content, setContent] = useState(value);

  useEffect(() => {
    setNoteSections([...noteSections.slice(0, index), content, ...noteSections.slice(index + 1)]);
  }, [content]);

  return (
    <div className="note-section">
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
      <div className="section-btns">
        <img
          src="/infinote/icons/delete.svg"
          title="Delete note section"
          onClick={() => {
            setNoteSections(noteSections.filter((section) => section !== value));
            setEditing(false);
          }}
        />
      </div>
    </div>
  );
}

export default NoteSection;
