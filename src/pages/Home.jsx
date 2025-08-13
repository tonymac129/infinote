import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import Hero from "../components/Hero";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

function Home({ topics, setTopics, favorites, reviews, recents }) {
  const [modal, setModal] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []);

  return (
    <motion.div initial={{ y: 250, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Hero title="Welcome to InfiNote!" description="The best note taking app made for students, by students" />
      <div className="groups">
        <div className="sections">
          <div className="section">
            <h2 className="section-title">Marked as Review</h2>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Link to={`/notes/${review}`} className="section-item">
                  {notes.find((note) => note.id == review).name}
                </Link>
              ))
            ) : (
              <p>Nice, nothing to review for now!</p>
            )}
          </div>
          <div className="section">
            <h2 className="section-title">Favorited Notes</h2>
            {favorites.length > 0 ? (
              favorites.map((favorite) => (
                <Link to={`/notes/${favorite}`} className="section-item">
                  {notes.find((note) => note.id == favorite).name}
                </Link>
              ))
            ) : (
              <p>No favorited notes so far...</p>
            )}
          </div>
          <div className="section">
            <h2 className="section-title">Recently Viewed</h2>
            {recents.length > 0 ? (
              [...recents].reverse().map((recent) => (
                <Link to={`/notes/${recent}`} className="section-item">
                  {notes.find((note) => note.id == recent)?.name}
                </Link>
              ))
            ) : (
              <p>You haven't read anything recently...</p>
            )}
          </div>
        </div>
        <div className="sections">
          {topics.map((topic) => {
            return (
              <div className="section">
                <Link to={`/topics/${topic.name.toLowerCase()}`} className="section-title">
                  {topic.name} notes
                </Link>
                {notes.find((note) => note.topic == topic.name) ? (
                  notes
                    .filter((note) => note.topic === topic.name)
                    .map((note) => (
                      <Link to={`/notes/${note.id}`} className="section-item">
                        {note.name}
                      </Link>
                    ))
                ) : (
                  <p>You haven't added any notes for this topic yet...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingBlock: "50px" }}>
        <Btn name="Add new topic" onClick={() => setModal(true)} />
      </div>
      <AnimatePresence>
        {modal && <Modal setModal={setModal} topics={topics} setTopics={setTopics} name="Topic" />}
      </AnimatePresence>
    </motion.div>
  );
}

export default Home;
