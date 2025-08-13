import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import NoteSection from "../components/NoteSection";
import "./Note.css";

function Note({ favorites, setFavorites, reviews, setReviews, recents, setRecents }) {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []);
  const [allNotes, setAllNotes] = useState(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []);
  const [favorited, setFavorited] = useState(favorites.includes(Number(id)));
  const [reviewed, setReviewed] = useState(reviews.includes(Number(id)));
  const [noteSections, setNoteSections] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let selectedNote = notes.find((note) => note.id == id);
    if (selectedNote) {
      setNote(selectedNote);
      setNotes(notes.filter((note) => note.topic === selectedNote.topic));
      setFavorited(favorites.includes(Number(id)));
      setReviewed(reviews.includes(Number(id)));
      let newRecents = [...recents];
      if (!recents.includes(Number(id))) {
        newRecents.push(Number(id));
        if (recents.length==6) {
          newRecents.shift();
        }
        setRecents(newRecents);
      } else {
        newRecents = newRecents.filter((recent) => recent != Number(id));
        newRecents.push(Number(id));
        setRecents(newRecents);
      }
    } else {
      navigate("/");
    }
  }, [id]);

  useEffect(() => {
    setNoteSections(note.sections);
  }, [note]);

  useEffect(() => {
    if (favorited) {
      if (!favorites.includes(Number(id))) setFavorites([...favorites, Number(id)]);
    } else {
      setFavorites(favorites.filter((favorite) => favorite != id));
    }
  }, [favorited]);

  useEffect(() => {
    if (reviewed) {
      if (!reviews.includes(Number(id))) setReviews([...reviews, Number(id)]);
    } else {
      setReviews(reviews.filter((review) => review != id));
    }
  }, [reviewed]);

  useEffect(() => {
    if (!editing) handleSave();
  }, [editing]);

  function handleNewSection() {
    setNoteSections([...noteSections, "Enter text here"]);
  }

  function handleSave() {
    setEditing(false);
    let prevNotes = allNotes.filter((noteItem) => {
      return noteItem.id !== note.id;
    });
    let prev = prevNotes.length > 0 ? [...prevNotes] : null;
    localStorage.setItem(
      "notes",
      JSON.stringify([...prev, { ...note, sections: noteSections, updated: new Date().toLocaleDateString() }])
    );
  }

  return (
    <>
      <title>{`${note.name} | InfiNote`}</title>
      <div className="note-container">
        <div className="note-sidebar">
          <h2 className="sidebar-title">{note.topic} notes</h2>
          <div className="note-links">
            {notes.map((item) => (
              <Link
                to={`/notes/${item.id}`}
                className="sidebar-link"
                style={{ color: item.id == note.id ? "var(--primary-color)" : "" }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="note-content">
          <div className="note-hero">
            <h1 className="note-name">{note.name}</h1>
            <div className="note-info">
              <div className="note-dates">
                <div className="note-date">{note.date}</div>
                <div className="note-update">{note.updated && "Last updated " + note.updated}</div>
              </div>
              <div className="note-icons">
                {!editing ? (
                  <>
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                      whileTap={{ scale: 1, rotate: -5, y: 0 }}
                      src="/icons/edit.svg"
                      className="note-icon"
                      title="Edit note"
                      onClick={() => setEditing(true)}
                    />
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                      whileTap={{ scale: 1, rotate: -5, y: 0 }}
                      src={reviewed ? "/icons/needs-review.svg" : "/icons/review.svg"}
                      className="note-icon"
                      title="Mark as needs review"
                      onClick={() => setReviewed(!reviewed)}
                    />
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                      whileTap={{ scale: 1, rotate: -5, y: 0 }}
                      src={favorited ? "/icons/favorited.svg" : "/icons/favorite.svg"}
                      className="note-icon"
                      title="Add to favorites"
                      onClick={() => setFavorited(!favorited)}
                    />
                  </>
                ) : (
                  <Btn name="Save" onClick={handleSave} />
                )}
              </div>
            </div>
            <hr className="note-hr" />
          </div>
          <div className="note-sections">
            {editing
              ? noteSections?.length > 0 &&
                noteSections.map((noteSection, i) => {
                  return (
                    <NoteSection
                      value={noteSection}
                      noteSections={noteSections}
                      setNoteSections={setNoteSections}
                      index={i}
                      setEditing={setEditing}
                    />
                  );
                })
              : noteSections?.length > 0 &&
                noteSections.map((noteSection) => (
                  <div className="note-paragraph" dangerouslySetInnerHTML={{ __html: noteSection }} />
                ))}
          </div>
          {editing && (
            <div className="add-section">
              <Btn name="Add note section" onClick={handleNewSection} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Note;
