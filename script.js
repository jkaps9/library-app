const myLibrary = [];

const bookContainer = document.querySelector("#library-container");

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numPages, isRead) {
    let newBook = new Book(title, author, numPages, isRead);
    myLibrary.push(newBook);
}

function displayBooks() {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const title = document.createElement("h3");
        title.textContent = book.title;
        const information = document.createElement("p");
        information.textContent = `by ${book.author}, ${book.numPages} pages`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove"
        deleteButton.setAttribute('id', 'remove')
        deleteButton.addEventListener('click', () => {
            removeArrayElement(deleteButton.parentElement.getAttribute('data-id'));
        });

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = book.isRead ? "read" : "unread";
        toggleReadButton.setAttribute('id', 'read');
        console.log(book.isRead);
        if (book.isRead) {
            toggleReadButton.classList.add("read");
        }
        bookCard.setAttribute('data-id', book.id);

        bookCard.appendChild(title);
        bookCard.appendChild(information);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(deleteButton);
        bookContainer.append(bookCard);
    });
}

function removeArrayElement(bookID) {
    var index = myLibrary.map(function (e) {
        return e.id;
    }).indexOf(bookID);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayBooks();
}

const addBookButton = document.querySelector("#add-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const confirmButton = addBookDialog.querySelector("#confirm");
const bookTitle = addBookDialog.querySelector("#title");
const bookAuthor = addBookDialog.querySelector("#author");
const bookPages = addBookDialog.querySelector("#pages");
const bookRead = addBookDialog.querySelector("#isRead");

addBookButton.addEventListener('click', () => addBookDialog.showModal());

addBookDialog.addEventListener("close", () => {
    if (addBookDialog.returnValue === "default") {
        console.log("No return value.");
    }
    else {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
        displayBooks();
    } // Have to check for "default" rather than empty string
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close(`${bookTitle.value} by ${bookAuthor.value}`);
});