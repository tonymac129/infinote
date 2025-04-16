const params = new URLSearchParams(window.location.search);
const topicID = params.get("topic");
const topicName = topicID[0].toUpperCase() + topicID.slice(1);
const pageTitle = document.getElementById("page-title");
const heroTitle = document.getElementById("hero-title");
const heroSub = document.getElementById("hero-sub");
const sections = document.getElementById("sections");
let notes, topics;

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    notes = data.notes;
    topics = data.topics;
    pageTitle.innerText = topicName + " Notes" + " | InfiNote";
    heroTitle.innerText = topicName;
    switch (topicID) {
      case "precalculus":
        heroSub.innerText = "Precalculus is an advanced math course with many topics focusing on prepping for calculus.";
        break;
      default:
        heroSub.innerText = "Explore various topics and enhance your knowledge with InfiNote.";
    }
    notes.forEach((note) => {
      if (note.course === topicName) {
        sections.appendChild(renderNote(note));
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching notes:", error);
  });

function renderNote(note) {
  const noteItem = document.createElement("a");
  let preview = note.content[0].text.substring(0, 100) + "...";
  console.log(preview);
  noteItem.innerHTML = `<img class="note-thumb" src="${note.thumb}" /><h2 class="note-title">${note.title}</h2><p class="note-preview">${preview}</p>`;
  noteItem.className = "section note";
  noteItem.href = `note.html?id=${note.id}`;
  return noteItem;
}
