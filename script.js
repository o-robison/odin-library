const library = [];
const tbody = document.querySelector("tbody");
const addBook = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const dialogClose = document.querySelector("#closeDialog");
const submitNewBook = document.querySelector("#submitBook");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#numPages");
const readInput = document.querySelector("#isRead");

addBook.addEventListener("click", () => {
    dialog.showModal();
});

dialogClose.addEventListener("click", () => {
    dialog.close();
});

submitNewBook.addEventListener("click", (e) => {
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    titleInput.value = authorInput.value = pagesInput.value = "";
    readInput.checked = false;
    e.preventDefault();
    dialog.close();
    displayLibrary();
});

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.isDisplayed = false;
}

function addBookToLibrary(title, author, numPages, isRead) {
    const newBook = new Book(title, author, numPages, isRead);
    library.push(newBook);
}

function displayLibrary() {
    for (const book of library) {
        if (!book.isDisplayed) {
            const newRow = tbody.insertRow();
            for (const prop in book) {
                const newCell = newRow.insertCell();
                const newText = document.createTextNode(book[prop]);
                newCell.appendChild(newText);
            }
            book.isDisplayed = true;
        }
    }
}

addBookToLibrary("One", "one", 3, false);
addBookToLibrary("Two", "two", 2, true);
displayLibrary();