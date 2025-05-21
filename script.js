const myLibrary = [];

const bookContainer = document.querySelector("#library-container");

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numPages) {
    let newBook = new Book(title, author, numPages);
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
        bookCard.appendChild(title);
        bookCard.appendChild(information);
        bookContainer.append(bookCard);
    });
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
    if (addBookDialog.returnValue === "Normal close") {
        console.log("No return value.");
    }
    else {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
        displayBooks();
    } // Have to check for "default" rather than empty string
    //console.log(`ReturnValue: ${addBookDialog.returnValue}.`)
});

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close(`${bookTitle.value} by ${bookAuthor.value}`);
});