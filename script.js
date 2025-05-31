const bookContainer = document.querySelector("#library-container");

class Book {
  id = crypto.randomUUID();

  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  books = [];

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(bookID) {
    var index = this.books
      .map(function (e) {
        return e.id;
      })
      .indexOf(bookID);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  displayBooks() {
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.firstChild);
    }
    myLibrary.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("card");

      const title = document.createElement("h3");
      title.textContent = book.title;
      const information = document.createElement("p");
      information.textContent = `by ${book.author}, ${book.numPages} pages`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Remove";
      deleteButton.setAttribute("id", "remove");
      deleteButton.addEventListener("click", () => {
        myLibrary.removeBook(
          deleteButton.parentElement.getAttribute("data-id")
        );
        myLibrary.displayBooks();
      });

      const toggleReadButton = document.createElement("button");
      toggleReadButton.textContent = book.isRead ? "read" : "unread";
      toggleReadButton.setAttribute("id", "read");
      toggleReadButton.addEventListener("click", () => {
        book.toggleReadStatus();
        myLibrary.displayBooks();
      });

      if (book.isRead) {
        toggleReadButton.classList.add("read");
      } else {
        toggleReadButton.classList.remove("read");
      }
      bookCard.setAttribute("data-id", book.id);

      bookCard.appendChild(title);
      bookCard.appendChild(information);
      bookCard.appendChild(toggleReadButton);
      bookCard.appendChild(deleteButton);
      bookContainer.append(bookCard);
    });
  }
}

const myLibrary = new Library();

const addBookButton = document.querySelector("#add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const confirmButton = addBookDialog.querySelector("#confirm");
const cancelButton = addBookDialog.querySelector("#cancel");
const newBookForm = addBookDialog.querySelector("form");

const bookTitle = addBookDialog.querySelector("#title");
const titleError = document.querySelector("#title + span.error");
const bookAuthor = addBookDialog.querySelector("#author");
const authorError = document.querySelector("#author + span.error");
const bookPages = addBookDialog.querySelector("#pages");
const pagesError = document.querySelector("#pages + span.error");
const bookRead = addBookDialog.querySelector("#isRead");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

addBookDialog.addEventListener("close", () => {
  if (addBookDialog.returnValue === "default") {
    let newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    );
    myLibrary.addBook(newBook);
    newBookForm.reset();
    myLibrary.displayBooks();
    titleError.textContent = "";
    titleError.className = "error";

    authorError.textContent = "";
    authorError.className = "error";

    pagesError.textContent = "";
    pagesError.className = "error";
  }
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close("cancel");
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !bookTitle.validity.valid ||
    !bookAuthor.validity.valid ||
    !bookPages.validity.valid
  ) {
    showError();
  } else {
    addBookDialog.close("default");
  }
});

function showError() {
  if (bookTitle.validity.valueMissing) {
    titleError.textContent = "Please enter a title";
  }

  if (bookAuthor.validity.valueMissing) {
    authorError.textContent = "Please enter an author";
  }

  if (bookPages.validity.rangeUnderflow) {
    pagesError.textContent = "Must be at least 1 page";
  }

  if (!bookTitle.validity.valid) {
    titleError.className = "error active";
  }
  if (!bookAuthor.validity.valid) {
    authorError.className = "error active";
  }
  if (!bookPages.validity.valid) {
    pagesError.className = "error active";
  }
}

bookTitle.addEventListener("input", (event) => {
  if (bookTitle.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showError();
  }
});

bookAuthor.addEventListener("input", (event) => {
  if (bookAuthor.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    showError();
  }
});

bookPages.addEventListener("input", (event) => {
  if (bookPages.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    showError();
  }
});
