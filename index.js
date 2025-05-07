const reviewSection = document.getElementById("review-section");
const favoriteSection = document.getElementById("favorite-section");
const recentSection = document.getElementById("recent-section");
const calcSection = document.getElementById("calc-section");
const precalcSection = document.getElementById("precalc-section");
const geometrySection = document.getElementById("geometry-section");

let favoritedNotes = localStorage.getItem("favorited") ? JSON.parse(localStorage.getItem("favorited")) : [];
let reviewNotes = localStorage.getItem("review") ? JSON.parse(localStorage.getItem("review")) : [];
let recentNotes = localStorage.getItem("recent") ? JSON.parse(localStorage.getItem("recent")) : [];
let notes, topics;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    notes = data.notes;
    topics = data.topics;
    data.notes.forEach((note) => {
      if (favoritedNotes.includes(note.id)) {
        favoriteSection.appendChild(renderItem(note));
      }
      if (reviewNotes.includes(note.id)) {
        reviewSection.appendChild(renderItem(note));
      }
      if (note.course === "Calculus") {
        calcSection.appendChild(renderItem(note));
      }
      if (note.course === "Precalculus") {
        precalcSection.appendChild(renderItem(note));
      }
      if (note.course === "Geometry") {
        geometrySection.appendChild(renderItem(note));
      }
    });
    recentNotes.forEach((noteID) => {
      const note = notes.find((note) => note.id === noteID);
      recentSection.appendChild(renderItem(note));
    });

    if (favoriteSection.children.length === 1) {
      favoriteSection.innerHTML += "<p>No favorited notes so far...</p>";
    }
    if (reviewSection.children.length === 1) {
      reviewSection.innerHTML += "<p>Nice, nothing to review for now!</p>";
    }
    if (recentSection.children.length === 1) {
      recentSection.innerHTML += "<p>You haven't read anything recently...</p>";
    }
    if (calcSection.children.length === 1) {
      calcSection.innerHTML += "<p>Get back to work and add more notes!</p>";
    }
    if (precalcSection.children.length === 1) {
      precalcSection.innerHTML += "<p>Get back to work and add more notes!</p>";
    }
    if (geometrySection.children.length === 1) {
      geometrySection.innerHTML += "<p>Get back to work and add more notes!</p>";
    }
  })
  .catch((error) => {
    console.error("Error fetching notes:", error);
  });

function renderItem(note) {
  const sectionItem = document.createElement("a");
  sectionItem.className = "section-item";
  sectionItem.href = `note.html?id=${note.id}`;
  sectionItem.innerText = note.title;
  return sectionItem;
}
