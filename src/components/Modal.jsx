import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Btn from "./Btn";

function Modal({ setModal, topics, setTopics, name, topic = null, edit = null }) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [id, setId] = useState(localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : 0);

  function handleAdd() {
    let newTopic;
    if (topic) {
      if (edit) {
        newTopic = {
          ...edit,
          name: nameRef.current.value,
          description: descriptionRef.current.value,
        };
        setTopics(topics.map((t) => (t.id === edit.id ? newTopic : t)));
      } else {
        newTopic = {
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          topic: topic,
          date: new Date().toLocaleDateString(),
          id: id,
          sections: ["Enter text here"],
        };
        setId(id + 1);
        setTopics([...topics, newTopic]);
      }
    } else {
      newTopic = { name: nameRef.current.value, description: descriptionRef.current.value };
      setTopics([...topics, newTopic]);
    }
    setModal(false);
  }

  useEffect(() => {
    nameRef.current.focus();
    nameRef.current.value = edit ? edit.name : "";
    descriptionRef.current.value = edit ? edit.description : "";
  }, [nameRef]);

  useEffect(() => localStorage.setItem("id", id), [id]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ y: "100vh", opacity: 0 }}
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) setModal(false);
      }}
    >
      <div className="modal">
        <h2 className="modal-title">{edit ? "Edit Note" : `Add ${name}`}</h2>
        <input
          type="text"
          className="modal-input"
          placeholder={`${name} name`}
          ref={nameRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <input
          type="text"
          className="modal-input"
          placeholder={`${name} description`}
          ref={descriptionRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <Btn name={edit ? "Edit Note" : `Add ${name}`} onClick={handleAdd} />
      </div>
    </motion.div>
  );
}

export default Modal;
