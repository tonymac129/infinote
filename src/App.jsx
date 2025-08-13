import { HashRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import ScrollTop from "./components/ScrollTop";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Note from "./pages/Note";
import About from "./pages/About";

function App() {
  const [topics, setTopics] = useState(localStorage.getItem("topics") ? JSON.parse(localStorage.getItem("topics")) : []);
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
  );
  const [reviews, setReviews] = useState(localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")) : []);
  const [recents, setRecents] = useState(localStorage.getItem("recents") ? JSON.parse(localStorage.getItem("recents")) : []);

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("recents", JSON.stringify(recents));
  }, [recents]);

  return (
    <HashRouter>
      <ScrollTop />
      <Nav topics={topics} />
      <Routes>
        <Route
          path="/"
          element={<Home topics={topics} setTopics={setTopics} favorites={favorites} reviews={reviews} recents={recents} />}
        />
        <Route path="/topics/:id" element={<Topic topics={topics} />} />
        <Route
          path="/notes/:id"
          element={
            <Note
              favorites={Array.from(favorites)}
              setFavorites={setFavorites}
              reviews={Array.from(reviews)}
              setReviews={setReviews}
              recents={Array.from(recents)}
              setRecents={setRecents}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
