import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Nav({ topics }) {
  const [mode, setMode] = useState(localStorage.getItem("mode") ? JSON.parse(localStorage.getItem("mode")) : false);
  const [searching, setSearching] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const topicsRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setSearching(false);
      }
      if (!topicsRef.current.contains(e.target)) {
        setTopicsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setResults(
      topics
        .filter((topic) => {
          return topic.name.toLowerCase().includes(search.toLowerCase());
        })
        .map((topic) => topic.name)
    );
  }, [search]);

  useEffect(() => {
    mode ? document.body.classList.add("light") : document.body.classList.remove("light");
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <>
      <nav className="nav">
        <div className="browse">
          <div className="search-wrap" ref={searchRef}>
            <input
              type="text"
              placeholder="Search any topic"
              autoComplete="off"
              className="search"
              onClick={() => setSearching(true)}
              onInput={(e) => setSearch(e.target.value)}
            />
            {searching && (
              <div className="search-container">
                {results.length > 0 ? (
                  results.slice(0, 5).map((result) => (
                    <Link to={`/topics/${result.toLowerCase()}`} className="section-item">
                      {result}
                    </Link>
                  ))
                ) : (
                  <div className="section-result">No topics found!</div>
                )}
              </div>
            )}
          </div>
          <motion.img
            whileHover={{ scale: 1.2, rotate: 15, y: -2 }}
            whileTap={{ scale: 1, rotate: -5, y: 0 }}
            src="/icons/toggle.svg"
            onClick={() => setMode(!mode)}
            className="nav-icon"
            title="Toggle light mode"
          />
          <motion.img
            whileHover={{ scale: 1.2, rotate: 15, y: -2 }}
            whileTap={{ scale: 1, rotate: -5, y: 0 }}
            src="/icons/reset.svg"
            onClick={() => {
              if (confirm("Are you sure you want to clear all your data on InfiNote? This action cannot be undone.")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="nav-icon"
            title="Reset data"
          />
        </div>
        <Link to="/" className="logo">
          <img src={mode ? "/light-logo.png" : "/logo.png"} />
        </Link>
        <div className="nav-links">
          <div className="topics" ref={topicsRef}>
            <div className="topics-label" onClick={() => setTopicsOpen(!topicsOpen)}>
              <img src="/icons/caret.svg" className="caret" style={{ transform: `rotate(${topicsOpen ? 90 : 0}deg)` }} /> Topics
            </div>
            <AnimatePresence>
              {topicsOpen && (
                <motion.div
                  className="topics-dropdown"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                >
                  {topics.length > 0
                    ? topics.map((topic) => {
                        return (
                          <Link to={`/topics/${topic.name.toLowerCase()}`} className="topic">
                            {topic.name}
                          </Link>
                        );
                      })
                    : "No topics added"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <a href="https://github.com/tonymac129/infinote" target="_blank" className="nav-link">
            GitHub
          </a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
