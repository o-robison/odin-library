const library = [];
const tbody = document.querySelector("tbody");

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

function displayLibrary() {
    for (const book of library) {
        const newRow = tbody.insertRow();
        for (const prop in book) {
            const newCell = newRow.insertCell();
            const newText = document.createTextNode(book[prop]);
            newCell.appendChild(newText);
        }
    }
}

addBookToLibrary("One", "one", 3, false);
addBookToLibrary("Two", "two", 2, true);
displayLibrary();