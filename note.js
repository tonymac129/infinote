const params = new URLSearchParams(window.location.search);
const noteID = parseInt(params.get("id"));
const pageTitle = document.getElementById("page-title");
const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const content = document.getElementById("content");
const controls = document.createElement("div");
let notes, topics;
controls.className = "controls";

let favoritedNotes = localStorage.getItem("favorited") ? JSON.parse(localStorage.getItem("favorited")) : [];
let reviewNotes = localStorage.getItem("review") ? JSON.parse(localStorage.getItem("review")) : [];
let recentNotes = localStorage.getItem("recent") ? JSON.parse(localStorage.getItem("recent")) : [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    notes = data.notes;
    topics = data.topics;
    const note = data.notes.find((note) => note.id === noteID);
    if (note) {
      console.log(recentNotes.indexOf(noteID));
      if (recentNotes.includes(noteID)) recentNotes.splice(recentNotes.indexOf(noteID), 1);
      recentNotes.unshift(noteID);
      console.log(recentNotes);
      if (recentNotes.length > 3) {
        recentNotes.shift();
      }
      localStorage.setItem("recent", JSON.stringify(recentNotes));
      pageTitle.innerText = note.title + " | InfiNote";
      renderNote(note);
      renderSideLinks(data, note);
      renderButtons(data, note);
      MathJax.typeset();
    }
  })
  .catch((error) => {
    console.error("Error fetching notes:", error);
  });

function renderNote(note) {
  sidebarTitle.innerText = note.course;
  content.innerHTML = `
    <h1 class="article-title">${note.title}</h1>
    <div class="article-info">
        <div class="article-date">${note.updated}</div>
        <div class="article-icons"></div>
    </div>
    <hr class="article-hr" />`;
  renderSections(note.content);
  content.appendChild(controls);
  const reviewBtn = document.createElement("img");
  reviewBtn.className = "article-icon";
  reviewBtn.src = reviewNotes.includes(noteID) ? "./icons/needs-review.svg" : "./icons/review.svg";
  if (reviewNotes.includes(noteID)) reviewBtn.style.filter = "invert(0)";
  reviewBtn.onclick = () => {
    if (!reviewBtn.src.includes("needs-review")) {
      reviewBtn.src = "./icons/needs-review.svg";
      reviewBtn.style.filter = "invert(0)";
      reviewNotes.push(noteID);
    } else {
      reviewBtn.src = "./icons/review.svg";
      reviewNotes.splice(reviewNotes.indexOf(noteID), 1);
      if (localStorage.getItem("mode") === "light") reviewBtn.style.filter = "var(--invert)";
    }
    localStorage.setItem("review", JSON.stringify(reviewNotes));
  };
  const starBtn = document.createElement("img");
  starBtn.className = "article-icon";
  starBtn.src = favoritedNotes.includes(noteID) ? "./icons/favorited.svg" : "./icons/favorite.svg";
  if (favoritedNotes.includes(noteID)) starBtn.style.filter = "invert(0)";
  starBtn.onclick = () => {
    if (!starBtn.src.includes("favorited")) {
      starBtn.src = "./icons/favorited.svg";
      starBtn.style.filter = "invert(0)";
      favoritedNotes.push(noteID);
    } else {
      starBtn.src = "./icons/favorite.svg";
      favoritedNotes.splice(favoritedNotes.indexOf(noteID), 1);
      if (localStorage.getItem("mode") === "light") starBtn.style.filter = "var(--invert)";
    }
    localStorage.setItem("favorited", JSON.stringify(favoritedNotes));
  };
  content.querySelector(".article-icons").append(reviewBtn, starBtn);
}

function renderSideLinks(data, note) {
  data.notes.forEach((newNote) => {
    if (newNote.course === note.course) {
      const link = document.createElement("a");
      link.href = `note.html?id=${newNote.id}`;
      link.className = "sidebar-link";
      if (newNote.id === note.id) {
        link.classList.add("active-link");
      }
      link.innerText = newNote.title;
      sidebar.appendChild(link);
    }
  });
}

function renderButtons(data, note) {
  const prevBtn = document.createElement("a");
  prevBtn.className = "control-btn";
  prevBtn.innerText = "Previous";
  prevBtn.onclick = () => {
    const prevNote = data.notes.find((n) => n.id === note.id - 1);
    if (prevNote) {
      window.location.href = `note.html?id=${prevNote.id}`;
    } else {
      window.location.href = "./";
    }
  };
  const nextBtn = document.createElement("button");
  nextBtn.className = "control-btn";
  nextBtn.innerText = "Next";
  nextBtn.onclick = () => {
    const nextNote = data.notes.find((n) => n.id === note.id + 1);
    if (nextNote) {
      window.location.href = `note.html?id=${nextNote.id}`;
    } else {
      window.location.href = "./";
    }
  };
  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
}

function renderSections(note) {
  note.forEach((section) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "article-section";
    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "article-subtitle";
    sectionTitle.innerText = section.title;
    if (section.hard) {
      sectionTitle.innerHTML += '<span class="hard">⚠️</span>';
    }
    const sectionContent = document.createElement("p");
    sectionContent.className = "article-paragraph";
    sectionContent.innerHTML = section.text;
    if (section.link) {
      const link = document.createElement("a");
      link.className = "article-link";
      link.target = "_blank";
      link.href = "https://youtube.com/watch?v=" + section.link;
      link.innerHTML = "<img src='./icons/link.svg'/>";
      sectionContent.appendChild(link);
    }
    if (section.tool) {
      const link = document.createElement("a");
      link.className = "article-link";
      link.target = "_blank";
      link.href = section.tool;
      link.innerHTML = "<img src='./icons/tool.svg'/>";
      sectionContent.appendChild(link);
    }
    sectionDiv.appendChild(sectionTitle);
    sectionDiv.appendChild(sectionContent);
    content.appendChild(sectionDiv);
  });
}
