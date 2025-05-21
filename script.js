const myLibrary = [];

const bookContainer = document.querySelector("#library-container");
console.log(bookContainer);

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

addBookButton.addEventListener('click', () => console.log("Add book button clicked"));

addBookToLibrary('The Hobbit', "J.R.R. Tolkein", 295, true);
addBookToLibrary('The Fellowship of the Ring', "J.R.R. Tolkein", 350, true);
addBookToLibrary('Two Towers', "J.R.R. Tolkein", 375, true);
addBookToLibrary('Return of the King', "J.R.R. Tolkein", 400, false);

displayBooks();