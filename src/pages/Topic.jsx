import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import Btn from "../components/Btn";
import "./Topic.css";

function Topic({ topics }) {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []);
  const [matchedNotes, setMatchedNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editNote, setEditNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let selectedTopic = topics.find((topic) => topic.name.toLowerCase() == id);
    if (selectedTopic) {
      setTopic(selectedTopic);
      setMatchedNotes(notes.filter((note) => note.topic === selectedTopic.name));
    } else {
      navigate("/");
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setMatchedNotes(notes.filter((note) => note.topic === topic.name));
  }, [notes, topic]);

  useEffect(() => {
    setMatchedNotes(
      notes.filter((note) => {
        return (
          note.topic === topic.name &&
          ((note.name && note.name.toLowerCase().includes(search.toLowerCase())) ||
            (note.description && note.description.toLowerCase().includes(search.toLowerCase())))
        );
      })
    );
  }, [search]);

  return (
    <motion.div initial={{ y: 250, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <title>{`${topic.name} notes | InfiNote`}</title>
      <Hero title={topic.name + " notes"} description={`View and manage all your notes about ${topic.name} here.`} />
      <div className="topic-browse">
        <input
          type="text"
          placeholder={`Search notes in ${topic.name}`}
          className="topic-search"
          onInput={(e) => setSearch(e.target.value)}
        />
        <Btn name="Add note" onClick={() => setModal(true)} />
      </div>
      <div className="topic-notes">
        {matchedNotes.length > 0 ? (
          matchedNotes.map((note) => (
            <Link to={`/notes/${note.id}`} className="topic-note">
              <span style={{ flex: 1, color: "var(--primary-text)", fontSize: "18px" }}>{note.name}</span>
              <span style={{ flex: 1.5 }}>{note.description}</span>
              <span>{note.date}</span>
              <span className="note-btns">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setEditNote(note);
                    setModal("edit");
                  }}
                  className="note-btn"
                >
                  Edit
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
                      setNotes(notes.filter((item) => item.id !== note.id));
                    }
                  }}
                  className="note-btn"
                >
                  Delete
                </div>
              </span>
            </Link>
          ))
        ) : (
          <div className="section-result" style={{ paddingBlock: "20px" }}>
            No notes added! Click on the button above to add one.
          </div>
        )}
      </div>
      <AnimatePresence>
        {modal === true ? (
          <Modal setModal={setModal} topics={notes} setTopics={setNotes} name="Note" topic={topic.name} />
        ) : (
          modal === "edit" && (
            <Modal setModal={setModal} topics={notes} setTopics={setNotes} name="Note" topic={topic.name} edit={editNote} />
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Topic;
