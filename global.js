const topicsLabel = document.getElementById("topics-label");
const topicsCaret = document.getElementById("caret");
const topicsDropdown = document.getElementById("topics-dropdown");
const toggleMode = document.getElementById("toggle");
const reset = document.getElementById("reset");
const logoImg = document.getElementById("logo-img");
const searchBar = document.getElementById("search");
const searchContainer = document.getElementById("search-container");

topicsLabel.onclick = () => {
  if (topicsDropdown.style.maxHeight) {
    collapseDropdown();
  } else {
    topicsDropdown.innerHTML = topics
      .map((topic) => {
        return `<a class="topic" href="topic.html?topic=${topic}">${topic[0].toUpperCase() + topic.slice(1)}</a>`;
      })
      .join("");
    topicsCaret.classList.toggle("caret-active");
    topicsDropdown.classList.toggle("dropdown-active");
    topicsDropdown.style.maxHeight = topicsDropdown.scrollHeight + 40 + "px";
  }
};

document.addEventListener("click", (e) => {
  if (!e.target.closest("#topics-label") && !e.target.closest("#topics-dropdown")) {
    collapseDropdown();
  }
  if (!e.target.closest("#search") && !e.target.closest("#search-container")) {
    searchContainer.classList.add("hide");
  }
});

function collapseDropdown() {
  topicsCaret.classList.remove("caret-active");
  topicsDropdown.style.maxHeight = null;
  topicsDropdown.classList.remove("dropdown-active");
}

toggleMode.onclick = () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("mode", "light");
    logoImg.src = "light-logo.png";
  } else {
    localStorage.setItem("mode", "dark");
    logoImg.src = "logo.png";
  }
};

if (localStorage.getItem("mode") === "light") {
  document.body.classList.add("light-mode");
  logoImg.src = "light-logo.png";
}

reset.onclick = () => {
  if (confirm("Are you sure you want to reset all your data on InfiNote?")) {
    localStorage.clear();
    location.reload();
  }
};

searchBar.oninput = () => search();
searchBar.onclick = () => search();

function search() {
  searchContainer.innerHTML = "";
  if (searchBar.value !== "") {
    const searchValue = searchBar.value.toLowerCase();
    notes.forEach((note) => {
      if (note.title.toLowerCase().includes(searchValue)) {
        const sectionItem = renderItem(note);
        searchContainer.appendChild(sectionItem);
      }
    });
    if (searchContainer.children.length == 0) {
      searchContainer.classList.add("hide");
    } else {
      searchContainer.classList.remove("hide");
    }
  } else {
    searchContainer.classList.add("hide");
  }
}

function renderItem(note) {
  const sectionItem = document.createElement("a");
  sectionItem.className = "section-item";
  sectionItem.href = `note.html?id=${note.id}`;
  sectionItem.innerText = note.title;
  return sectionItem;
}
