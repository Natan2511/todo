document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  const createButton = document.getElementById("create");
  const list = document.getElementById("list");

  // Загрузка заметок из localStorage при загрузке страницы
  loadNotes();

  createButton.addEventListener("click", function () {
    const title = titleInput.value.trim();

    if (title !== "") {
      addNoteToList(title);
      saveNotesToLocalStorage();
      titleInput.value = ""; // Очистка поля ввода после добавления заметки
    }
  });

  list.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-danger")) {
      event.target.closest("li").remove();
      saveNotesToLocalStorage(); // Сохранение заметок после удаления
    }
  });

  // Функция добавления заметки в список
  function addNoteToList(title) {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    listItem.innerHTML = `
        <span>${title}</span>
        <span class="d-flex gap-3">
          <span class="btn btn-small btn-success">&check;</span>
          <span class="btn btn-small btn-danger">&times;</span>
        </span>
      `;
    list.appendChild(listItem);
  }

  // Функция сохранения заметок в localStorage
  function saveNotesToLocalStorage() {
    const notes = Array.from(list.children).map(
      (item) => item.querySelector("span").textContent
    );
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Функция загрузки заметок из localStorage
  function loadNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      notes.forEach((note) => addNoteToList(note));
    }
  }
});
