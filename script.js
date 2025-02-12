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
}

function addBookToLibrary(title, author, numPages, isRead) {
    const newBook = new Book(title, author, numPages, isRead);
    library.push(newBook);
}

function removeBookFromLibrary(bookID) {
    library.splice(bookID, 1);
    displayLibrary();
}

function displayLibrary() {
    tbody.innerHTML = "";
    for (var i=0; i<library.length; i++) {
        const book = library[i];
        const newRow = tbody.insertRow();
        for (const prop in book) {
            const newCell = newRow.insertCell();
            const newText = document.createTextNode(book[prop]);
            newCell.appendChild(newText);
        }
        if(!book.isRead){
            const readButtonCell = newRow.insertCell();
            readButtonCell.innerHTML = `<button class="markRead" data-bookID="${i}">Mark Read</button>`;
        } else {
            const blankCell = newRow.insertCell();
        }
        const removeButtonCell = newRow.insertCell();
        removeButtonCell.innerHTML = `<button class="removeBook" data-bookId="${i}">Remove</button>`;
    }

    const removeButtons = document.getElementsByClassName("removeBook");
    for (button of removeButtons) {
        button.addEventListener("click", (e) => {
            removeBookFromLibrary(e.target.dataset.bookId);
        });
    }
}

addBookToLibrary("One", "one", 3, false);
addBookToLibrary("Two", "two", 2, true);
displayLibrary();